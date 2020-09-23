import { SearchOutlined } from '@ant-design/icons';
import { Button, Row, Col, Tag, Select, Checkbox, Form, Input, message, Tooltip, Badge } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { searchModel } from '@/services/model';
import { getScenarios } from '@/services/scenario';

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
    model.scenario_name = model.scenario.name;
    model.tags = [];
    if (model.public) {
      model.tags.push('public');
    }
    if (model.isBase) {
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
  title = 'Model Details',
  subTitle = 'Choose a model to view full details',
  user,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      width: 200,
      textWrap: 'word-break',
    },
    {
      title: 'Scenario',
      dataIndex: 'scenario_name',
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
    },
    {
      title: 'Reduction year',
      dataIndex: 'reduction_year',
    },
    {
      title: 'Water content',
      dataIndex: 'water_content',
      render: (value) => `${value * 100}%`,
    },
    {
      title: 'Date Created',
      dataIndex: 'date_submitted',
      sorter: (a, b) => new Date(a.date_submitted) > new Date(b.date_submitted),
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      title: 'Date Completed',
      dataIndex: 'date_completed',
      sorter: (a, b) => new Date(a.date_completed) > new Date(b.date_completed),
      render: (value) => new Date(value).toLocaleString(),
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
                title = `base model of ${record.scenario.name}`;
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
        <Tooltip title="View details">
          <a href={`/model/view?id=${record.id}`}>Details</a>
        </Tooltip>
      ),
      width: 100
    },
  ];
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({
    types: ['public', 'original', 'base'],
    search_text: '',
    scenarios: [],
    status: [0, 1, 2, 3, 4],
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    hideOnSinglePage: false,
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    responsive: true,
  });
  const [sorter, setSorter] = useState('');
  useEffect(() => {
    (async () => {
      const { data: results, total } = await searchModel(
        pagination,
        ['public', 'original', 'base'],
        user.token,
        '',
        null,
        null,
        [0, 1, 2, 3, 4],
      ).then((res) => ListResponseProcessing(res, user.user_id));
      setData(results);
      setPagination({
        ...pagination,
        total,
      });
    })();
  }, []);
  const query = (_pagination, _options, _sorter) => {
    message.loading({
      content: 'searching...',
      key: 'updating',
    });
    (async () => {
      const { data: results, total } = await searchModel(
        _pagination,
        _options.types || [],
        user.token,
        _options.search_text || '',
        _sorter,
        _options.scenarios,
        _options.status,
      ).then((res) => ListResponseProcessing(res, user.user_id));
      setData(results);
      setPagination({
        ..._pagination,
        total,
      });
    })();
    message.success({
      content: 'updated',
      key: 'updating',
    });
  };
  const onSearch = (values) => {
    setOptions({ ...values });
    query(pagination, values, sorter);
  };
  return (
    <PageHeaderWrapper
      title={title}
      subTitle={subTitle}
      content={<SearchForm onSearch={onSearch} />}
    >
      <ConfigProvider value={{
        intl: enUSIntl
      }}>
        <ProTable
          headerTitle="Search results"
          pagination={pagination}
          dataSource={data}
          scroll={{ x: 'max-content' }}
          rowKey="id"
          columns={columns}
          bordered
          onChange={(page, _, _sorter) => {
            let sorter_query;
            if (_sorter.order) {
              sorter_query = `${_sorter.field},${_sorter.order}`;
            } else {
              sorter_query = '';
            }
            setSorter(sorter_query);
            query(page, options, sorter_query);
          }}
          rowSelection={false}
          search={false}
        />
      </ConfigProvider>
    </PageHeaderWrapper>
  );
};

const SearchForm = ({ onSearch }) => {
  const [scenarios, setScenarios] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await getScenarios();
      setScenarios(results);
    })();
  }, []);
  return (
    <Form
      style={{
        marginTop: 20,
      }}
      onFinish={onSearch}
    >
      <Row gutter={16}>
        <Col flex="auto">
          <Form.Item label="Name/Description" name="search_text">
            <Input placeholder="Search by model name or description" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Model types" name="types" initialValue={['public', 'original', 'base']}>
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
        <Col xs={24} sm={16}>
          <Form.Item name="scenarios" label="Scenarios">
            <Select
              mode="multiple"
              showArrow
              placeholder="Filter scenarios"
              style={{ width: '100%' }}
            >
              {scenarios.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label="Status"
            name="status"
            valuePropName="checked"
            initialValue={["0", "1", "2", "3", "4"]}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}>
                  <Checkbox value="0">
                    <Badge text="Not ready" status="warning"/>
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="1">
                    <Badge text="In queue" status="default"/>
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="2">
                    <Badge text="Running" status="processing"/>
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="3">
                    <Badge text="Complete" status="success"/>
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="4">
                    <Badge text="Error" status="error"/>
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item style={{ margin: 0 }}>
            <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
              <SearchOutlined />
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(SearchTable);
