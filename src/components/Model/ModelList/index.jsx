import { ClearOutlined, DoubleLeftOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Row,
  Col,
  Tag,
  Select,
  Form,
  Input,
  Tooltip,
  Card,
  Divider,
  Checkbox,
  Badge,
} from 'antd';
import React, { useState, useRef } from 'react';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { searchModel } from '@/services/model';
import { useScenarioGroups } from '@/hooks/scenario';
import TagRender from '@/components/ScenarioTag/TagRender';
import ListResponseProcessing from '@/components/ScenarioTag/ListResponseProcessing';

const SearchTable = ({ user, isEditing, isMobile }) => {
  const actionRef = useRef();
  const title = isEditing ? 'Modify Scenario' : 'Scenario Details';
  const subTitle = isEditing ? 'Create another scenario with similar settings swiftly' : "Choose a scenario to view full details";
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      ellipsis: isMobile,
      width: isMobile ? 100 : 200,
      copyable: true,
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
      title: 'Well Type Scenario',
      dataIndex: 'welltype_scenario_name',
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
                title = `BAU of  ${record.flow_scenario.name}, ${record.load_scenario.name}, ${record.unsat_scenario.name}, ${record.welltype_scenario.name}`;
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
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <>
          <Tooltip title="View details & results">
            <a href={`/model/view?id=${record.id}`}>Details</a>
          </Tooltip>
          {isEditing && <>
            <Divider type="vertical" />
            <Tooltip title="Create another scenario with settings pre-filled">
              <a href={`/model/modify?id=${record.id}`}>Copy & Modify</a>
            </Tooltip>
          </>}
        </>
      ),
      width: isEditing ? 180 : 70,
    },
  ];

  if (isEditing) {
    columns.splice(11, 0, {
      title: 'Regions',
      dataIndex: 'regions',
      // warning: there is something wrong with the library of this render function
      // this is only a workaround after examine the internal structure
      // please be aware when the lib is upgraded
      render: (value) => value.props.title.map((region) => region.name).join(', '),
      ellipsis: true,
      width: 300,
    },);
  }

  const [options, setOptions] = useState({
    types: ['public', 'original', 'base'],
    search_text: '',
    scenarios: [],
    status: [0, 1, 2, 3, 4],
  });
  const [sorter, setSorter] = useState('');
  const onSearch = (values) => {
    if (isEditing) {
      setOptions({ ...values });
    } else {
      setOptions({ ...options, ...values });
    }
    actionRef.current.reload();
  };
  return (
    <PageHeaderWrapper title={title} subTitle={subTitle}>
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
          headerTitle="Search results"
          rowKey="id"
          actionRef={actionRef}
          columns={columns}
          scroll={{ x: 'max-content' }}
          bordered
          onChange={(page, _, _sorter) => {
            let sorter_query;
            if (_sorter.order) {
              sorter_query = `${_sorter.field},${_sorter.order}`;
            } else {
              sorter_query = '';
            }
            setSorter(sorter_query);
          }}
          rowSelection={false}
          search={false}
          pagination={{
            defaultPageSize: 10,
          }}
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
        />
      </ConfigProvider>
    </PageHeaderWrapper>
  );
};

const SearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const { flowScenarios, loadScenarios, unsatScenarios, welltypeScenarios } = useScenarioGroups();
  const getFields = () => {
    return expand ? (
      <>
        <Row gutter={16}>
          <Col flex="auto">
            <Form.Item label="Name/Description" name="search_text">
              <Input placeholder="Search by scenario name or description" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Scenario types"
              name="types"
              initialValue={['public', 'original', 'base']}
            >
              <Select
                mode="multiple"
                showArrow
                placeholder="Select Scenario types"
                style={{ width: '100%' }}
                tagRender={TagRender}
                options={[
                  { label: 'include public scenarios', value: 'public' },
                  { label: 'include self-created scenarios', value: 'original' },
                  { label: 'include base scenario scenarios', value: 'base' },
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
                <Select.OptGroup label="Well Type Scenario">
                  {welltypeScenarios.map((item) => (
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
              <Input placeholder="Search by scenario name or description" />
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

export default SearchTable;
