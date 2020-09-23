import { SearchOutlined } from '@ant-design/icons';
import { Button, Row, Col, Tag, Select, Table, Card, Form, Input, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { connect } from 'react-redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { searchModel } from '@/services/model';
import { getScenarios } from '@/services/scenario';

const TagRender = props => {
  const { value, closable, onClose } = props;
  let color;
  switch (value) {
    default:
    case "original":
      color = "volcano";
      break;
    case "public":
      color = "geekblue"
      break;
    case "base":
      color = "green"
  }
  return (
    <Tag color={color} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {value}
    </Tag>
  );
}

const ListResponseProcessing = (response, userId) => {
  const { results } = response;
  const data = []
  results.forEach(temp => {
    const model = temp;
    model.key = model.id
    model.scenario_name = model.scenario.name;
    model.tags = [];
    if (model.public) {
      model.tags.push("public");
    }
    if (model.isBase) {
      model.tags.push("base");
    }
    if (model.user === userId) {
      model.tags.push("original");
    }
    data.push(model);
  });
  return {
    data,
    total: response.count
  }
}

const SearchTable = ({
  title = "Results comparison",
  subTitle,
  columns,
  user
}) => {
  const [ data, setData ] = useState([]);
  const [ options, setOptions ] = useState({
    types: [ 'public', 'original', 'base' ],
    search_text: '',
    scenarios: []
  });
  const [ pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    hideOnSinglePage: false,
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    responsive: true,
  });
  const [ sorter, setSorter ] = useState('');
  useEffect(() => {
    (async () => {
      const { data: results, total } = await searchModel(
        pagination,
        [ 'public', 'original', 'base' ],
        user.token,
        ''
      ).then(
        res => ListResponseProcessing(res, user.user_id)
      );
      setData(results);
      setPagination({
        ...pagination,
        total
      })
    })();
  }, []);
  const query = (_pagination, _options, _sorter) => {
    message.loading({
      content: "searching...",
      key: 'updating'
    });
    (async () => {
      const {
        data: results, total
      } = await searchModel(_pagination, _options.types || [], user.token, _options.search_text || '', _sorter, _options.scenarios)
        .then(res => ListResponseProcessing(res, user.user_id));
      setData(results);
      setPagination({
        ..._pagination,
        total
      })
    })();
    message.success({
      content: "updated",
      key: 'updating'
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
      extra={
        <NavigationButton />
      }
      content={
        <SearchForm
          onSearch={onSearch}
        />
      }
    >
      <Card
        title="Search results"
      >
        <Table
          pagination={pagination}
          dataSource={data}
          rowKey="id"
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
            query(page, options, sorter_query);
          }}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

const NavigationButton = props => (
  <Button
    href="/charts/group"
    onClick={() => {
      history.push({
        path: "/charts/group"
      })
    }}
    type="primary"
  >
    Switch to custom models comparison
  </Button>
);

const SearchForm = ({ onSearch })  => {
  const [ scenarios, setScenarios ] = useState([]);
  useEffect(() => {
    (async () => {
      const { results } = await getScenarios();
      setScenarios(results);
    })();
  }, []);
  return (
    <Form
      style={{
        marginTop: 20
      }}
      onFinish={onSearch}
    >
      <Row gutter={16}>
        <Col flex="auto">
          <Form.Item
            label="Name/Description"
            name="search_text"
          >
            <Input
              placeholder="Search by model name or description"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label="Model types"
            name="types"
            initialValue={[ 'public', 'original', 'base' ]}
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
        <Col xs={24} sm={16}>
          <Form.Item
            name="scenarios"
            label="Scenarios"
          >
            <Select
              mode="multiple"
              showArrow
              placeholder="Filter scenarios"
              style={{ width: '100%' }}
            >
              {scenarios.map(item => <Select.Option
                key={item.id}
                value={item.id}>
                {item.name}
              </Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            style={{ margin: 0 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ float: 'right' }}
            >
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
  user: user.currentUser
}))(SearchTable);
