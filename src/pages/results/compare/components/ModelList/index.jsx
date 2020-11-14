import { SearchOutlined } from '@ant-design/icons';
import { Button, Row, Col, Tag, Select, Form, Input, Tooltip } from 'antd';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { history } from 'umi';
import { connect } from 'react-redux';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { searchModel } from '@/services/model';
import { getScenarios, SCENARIO_MACROS } from '@/services/scenario';

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

const SearchTable = ({ user }) => {
  const { isMobile } = useContext(RouteContext);
  const actionRef = useRef();
  const subTitle = 'Compare a completed custom model with the base model under same scenario';
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
      title: 'Year range',
      dataIndex: 'n_years',
      render: (value) => `1945 - ${1945 + value}`,
      sorter: (a, b) => a > b,
    },
    {
      title: 'Implementation start year',
      dataIndex: 'reduction_start_year',
      sorter: (a, b) => a > b,
    },
    {
      title: 'Implementation end year',
      dataIndex: 'reduction_end_year',
      sorter: (a, b) => a > b,
    },
    {
      title: 'Water content',
      dataIndex: 'water_content',
      render: (value) => `${value * 100}%`,
      sorter: (a, b) => a > b,
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
      render: (_, record) =>
        !record.is_base ? (
          <Tooltip title={`Compare with base model of scenario ${record.scenario.name}`}>
            <a href={`/charts/compare?id=${record.id}`}>Compare</a>
          </Tooltip>
        ) : (
          <Tooltip title="Base model cannot compare with itself, check its detail instead">
            <a href={`/model/view?id=${record.id}`}>Details</a>
          </Tooltip>
        ),
      width: 100,
    },
  ];
  const [options, setOptions] = useState({
    types: ['public', 'original', 'base'],
    search_text: '',
    scenarios: [],
  });
  const [sorter, setSorter] = useState('');
  const onSearch = (values) => {
    setOptions({ ...values });
    actionRef.current.reload();
  };
  return (
    <PageHeaderWrapper
      title="Base model comparison"
      subTitle={subTitle}
      extra={
        <Button
          href="/charts/group"
          onClick={() => {
            history.push({
              path: '/charts/group',
            });
          }}
          type="primary"
        >
          Switch to custom models comparison
        </Button>
      }
      content={<SearchForm onSearch={onSearch} />}
    >
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
  const [flowScenarios, setFlowScenarios] = useState([]);
  const [loadScenarios, setLoadScenarios] = useState([]);
  const [unsatScenarios, setUnsatScenarios] = useState([]);
  useEffect(() => {
    getScenarios(SCENARIO_MACROS.TYPE_FLOW).then(({ results }) => {
      setFlowScenarios(results);
    });
    getScenarios(SCENARIO_MACROS.TYPE_LOAD).then(({ results }) => {
      setLoadScenarios(results);
    });
    getScenarios(SCENARIO_MACROS.TYPE_UNSAT).then(({ results }) => {
      setUnsatScenarios(results);
    });
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
        <Col xs={24} sm={8}>
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
