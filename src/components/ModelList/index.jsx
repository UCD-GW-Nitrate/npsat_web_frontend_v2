import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Tooltip, Popconfirm, Tag, Select, Table, Card } from 'antd';
import React, { useState, useRef } from 'react';
import { history } from 'umi';
import { connect } from 'react-redux';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';

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
  title,
  subTitle,
  columns
}) => {
  return (
    <PageHeaderWrapper
      title={title}
      subTitle={subTitle}
    >
      <Card >
      </Card>
      <Card>
        <Table />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser
}))(SearchTable);
