import { ClearOutlined, DoubleLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Row, Col, Tag, Select, Checkbox, Form, Input, Tooltip, Badge, Card } from 'antd';
import React, { useState, useContext, useRef } from 'react';
import { history } from 'umi';
import { connect } from 'react-redux';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { searchModel } from '@/services/model';
import { useScenarioGroups } from '@/hooks/scenario';

const TagRender = (props) => {
  const { value, closable, onClose } = props;
  let color;
  switch (value) {
    default:
    case 'original':
      color = 'volcano';
      break;
    case 'public':
      color = 'geekblue';
      break;
    case 'base':
      color = 'green';
  }
  return (
    <Tag color={color} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {value}
    </Tag>
  );
};

const ListResponseProcessing = (response, userId) => {
  const { results } = response;
  const data = [];
  results.forEach((temp) => {
    const model = temp;
    model.key = model.id;
    model.flow_scenario_name = model.flow_scenario.name;
    model.load_scenario_name = model.load_scenario.name;
    model.unsat_scenario_name = model.unsat_scenario.name;
    model.tags = [];
    if (model.public) {
      model.tags.push('public');
    }
    if (model.is_base) {
      model.tags.push('base');
    }
    if (model.user === userId) {
      model.tags.push('original');
    }
    data.push(model);
  });
  return {
    data,
    total: response.count,
  };
};

const SearchTable = ({
  title = 'Custom models group comparison',
  subTitle = 'Select up to 5 models to compare and view together.',
  user,
}) => {
  const { isMobile } = useContext(RouteContext);
  const actionRef = useRef();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      copyable: true,
      ellipsis: isMobile,
      width: isMobile ? 100 : 200,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      width: 250,
    },
    {
      title: 'Flow Scenario',
      dataIndex: 'flow_scenario_name',
      copyable: true,
    },
    {
      title: 'Load Scenario',
      dataIndex: 'load_scenario_name',
      copyable: true,
    },
    {
      title: 'Unsat Scenario',
      dataIndex: 'unsat_scenario_name',
      copyable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: 'Not ready',
          status: 'Warning',
        },
        1: {
          text: 'In queue',
          status: 'Default',
        },
        2: {
          text: 'Running',
          status: 'Processing',
        },
        3: {
          text: 'Complete',
          status: 'Success',
        },
        4: {
          text: 'Error',
          status: 'Error',
        },
      },
      width: 100,
    },
    {
      title: 'Year range',
      dataIndex: 'sim_end_year',
      render: (value) => `1945 - ${value}`,
      sorter: (a, b) => a > b,
    },
    {
      title: 'Implementation start year',
      dataIndex: 'reduction_start_year',
      sorter: (a, b) => a > b,
    },
    {
      title: 'Implementation complete year',
      dataIndex: 'reduction_end_year',
      sorter: (a, b) => a > b,
    },
    {
      title: 'Water content',
      dataIndex: 'water_content',
      render: (value) => `${(value * 100).toFixed(0)}%`,
      sorter: (a, b) => a > b,
    },
    {
      title: 'Date Created',
      dataIndex: 'date_submitted',
      sorter: (a, b) => new Date(a.date_submitted) > new Date(b.date_submitted),
      valueType: 'dateTime',
    },
    {
      title: 'Date Completed',
      dataIndex: 'date_completed',
      sorter: (a, b) => new Date(a.date_completed) > new Date(b.date_completed),
      valueType: 'dateTime',
    },
    {
      title: 'Types',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags, record) => (
        <span>
          {tags.map((tag) => {
            let color;
            let title;
            switch (tag) {
              default:
              case 'original':
                color = 'volcano';
                title = 'created by you';
                break;
              case 'public':
                color = 'geekblue';
                title = 'accessible by everyone';
                break;
              case 'base':
                color = 'green';
                title = `BAU of ${record.flow_scenario.name}, ${record.load_scenario.name}, ${record.unsat_scenario.name}`;
            }
            return (
              <Tooltip title={title} key={record.key + tag}>
                <Tag color={color} key={tag}>
                  {tag}
                </Tag>
              </Tooltip>
            );
          })}
        </span>
      ),
    },
  ];
  const [options, setOptions] = useState({
    types: ['public', 'original', 'base'],
    search_text: '',
    scenarios: [],
    status: [0, 1, 2, 3, 4],
  });
  const [sorter, setSorter] = useState('');
  const [models, setModels] = useState([]);
  const onSearch = (values) => {
    setOptions({ ...values });
    actionRef.current.reload();
  };
  return (
    <PageHeaderWrapper
      title={title}
      subTitle={subTitle}
      extra={
        <Button
          href="/compare/BAU"
          type="primary"
          onClick={() => {
            history.push({
              path: '/compare/BAU',
            });
          }}
        >
          Switch to BAU comparison
        </Button>
      }
    >
      <Card
        style={{
          marginBottom: 16,
        }}
      >
        <SearchForm onSearch={onSearch} />
      </Card>
      <ConfigProvider
        value={{
          intl: enUSIntl,
        }}
      >
        <ProTable
          actionRef={actionRef}
          headerTitle="Search results"
          scroll={{ x: 'max-content' }}
          rowKey="id"
          columns={columns}
          bordered
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter;
            if (sorterResult.order) {
              setSorter(`${sorterResult.field},${sorterResult.order}`);
            } else {
              setSorter('');
            }
          }}
          tableAlertRender={({ selectedRowKeys }) => (
            <div>
              Selected &nbsp;
              <a
                style={{
                  fontWeight: 600,
                  color: selectedRowKeys.length > 5 ? 'red' : '#1890ff',
                }}
              >
                {selectedRowKeys.length}
              </a>
              &nbsp; Model(s). Maximum of{' '}
              <a
                style={{
                  fontWeight: 600,
                  color: selectedRowKeys.length > 5 ? 'red' : '#1890ff',
                }}
              >
                5
              </a>{' '}
              .
            </div>
          )}
          toolBarRender={(action, { selectedRowKeys }) => [
            <Tooltip
              title={() => {
                if (selectedRowKeys.length === 0) {
                  return 'Start select models.';
                } else if (selectedRowKeys.length === 1) {
                  return 'Select more models for comparison.';
                } else if (selectedRowKeys.length > 5) {
                  return 'Too much models selected.';
                } else {
                  return 'Confirm and compare models.';
                }
              }}
            >
              <Button
                type="primary"
                disabled={selectedRowKeys.length <= 1 || selectedRowKeys.length > 5}
                onClick={() => {
                  history.push({
                    path: '/compare/group',
                    query: { ids: selectedRowKeys.join(',') },
                  });
                }}
              >
                Compare in groups
              </Button>
            </Tooltip>,
          ]}
          request={(_page) =>
            searchModel(
              _page,
              options.types,
              user.token,
              options.search_text,
              sorter,
              options.scenarios,
              options.status,
            ).then((res) => ListResponseProcessing(res, user.user_id))
          }
          pagination={{
            defaultPageSize: 10,
          }}
          rowSelection={{ preserveSelectedRowKeys: true }}
          search={false}
        />
      </ConfigProvider>
    </PageHeaderWrapper>
  );
};

const SearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const { flowScenarios, loadScenarios, unsatScenarios } = useScenarioGroups();
  const getFields = () => {
    return expand ? (
      <>
        <Row gutter={16}>
          <Col flex="auto">
            <Form.Item label="Name/Description" name="search_text">
              <Input placeholder="Search by model name or description" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Model types"
              name="types"
              initialValue={['public', 'original', 'base']}
            >
              <Select
                mode="multiple"
                showArrow
                placeholder="Select model types"
                style={{ width: '100%' }}
                tagRender={TagRender}
                options={[
                  { label: 'include public models', value: 'public' },
                  { label: 'include self-created models', value: 'original' },
                  { label: 'include base scenario models', value: 'base' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={14}>
            <Form.Item name="scenarios" label="Scenarios">
              <Select
                mode="multiple"
                showArrow
                placeholder="Filter scenarios"
                style={{ width: '100%' }}
                optionFilterProp="children"
              >
                <Select.OptGroup label="Flow Scenario">
                  {flowScenarios.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
                <Select.OptGroup label="Load Scenario">
                  {loadScenarios.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
                <Select.OptGroup label="Unsat Scenario">
                  {unsatScenarios.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={10}>
            <Form.Item
              label="Status"
              name="status"
              valuePropName="checked"
              initialValue={['0', '1', '2', '3', '4']}
              rules={[
                {
                  required: true,
                  message: 'You must select at least one status',
                },
              ]}
            >
              <Checkbox.Group style={{ width: '100%' }} defaultValue={['0', '1', '2', '3', '4']}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="0">
                      <Badge text="Not ready" status="warning" />
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="1">
                      <Badge text="In queue" status="default" />
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="2">
                      <Badge text="Running" status="processing" />
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="3">
                      <Badge text="Complete" status="success" />
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="4">
                      <Badge text="Error" status="error" />
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item style={{ margin: 0, textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                <SearchOutlined />
                Search
              </Button>
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                <ClearOutlined />
                Clear
              </Button>
              <a
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                <DoubleLeftOutlined rotate={90} /> Collapse
              </a>
            </Form.Item>
          </Col>
        </Row>
      </>
    ) : (
      <>
        <Row gutter={16}>
          <Col flex="auto">
            <Form.Item label="Name/Description" name="search_text" style={{ margin: 0 }}>
              <Input placeholder="Search by model name or description" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item style={{ margin: 0, textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                <SearchOutlined />
                Search
              </Button>
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                <ClearOutlined />
                Clear
              </Button>
              <a
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                <DoubleLeftOutlined rotate={270} /> Expand
              </a>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };
  return (
    <Form onFinish={onSearch} hideRequiredMark form={form}>
      {getFields()}
    </Form>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(SearchTable);
