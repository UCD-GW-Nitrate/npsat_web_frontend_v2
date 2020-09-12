import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Tooltip, Popconfirm, Tag, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { history } from 'umi';
import { connect } from 'react-redux';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import ProTable, {IntlProvider, enUSIntl,} from '@ant-design/pro-table';
import { deleteModel, queryModelList } from './service';

const handleViewBatch = (selectedRows) => {
  let modelGroup = '';
  selectedRows.forEach(item => {
    modelGroup += `${item.id} `;
  })
  history.push({
    pathname: '/charts',
    query: {
      ids: encodeURI(modelGroup)
    }
  })
}

/**
 * handle crate new model button
 * redirect page
 */
const handleCreate = () => {
  history.push('/model/create');
}

const TagRender = props => {
  const { label, value, closable, onClose } = props;
  return (
    <Tag color={label} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {value}
    </Tag>
  );
}

const ListResponseProcessing = (response, userId) => {
  const { results } = response;
  const data = []
  results.forEach(temp => {
    const model = temp;
    if (model.complete) {
      model.status = 3;
    } else if (model.running) {
      model.status = 2;
    } else if (model.ready) {
      model.status = 1;
    } else {
      model.status = 0;
    }
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

/**
 * handle click: delete model
 * @param id
 * @param token
 */
const onClickDelete = async (id, token, action) => {
  const hide = message.loading('Deleting...');
  try {
    await deleteModel({ id }, token);
    hide();
    message.success('Model deleted. Refreshing...');
    action.current.reload();
  } catch (error) {
    hide();
    message.error('Model deletion failed, please try again');
  }
}

const OverviewList = props => {
  const { user } = props;
  const { token: userToken, user_id: userId } = user;
  const [ sorter, setSorter ] = useState('');
  const [ types, setTypes ] = useState(['public', 'base', 'original']);
  const actionRef = useRef();
  const columns = [
    {
      title: 'Model Name',
      dataIndex: 'name',
      valueType: 'textarea'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
      width: 250
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: 'Unknown',
          status: 'Error'
        },
        1: {
          text: 'Ready',
          status: 'Default',
        },
        2: {
          text: 'Pending',
          status: 'Processing',
        },
        3: {
          text: 'Complete',
          status: 'Success',
        },
      },
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
      valueType: 'dateTime'
    },
    {
      title: 'Types',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags, record) => (
        <span>
        {tags.map(tag => {
          let color;
          let title;
          switch (tag) {
            default:
            case "original":
              color = "volcano";
              title = "created by you"
              break;
            case "public":
              color = "geekblue"
              title = "accessible by everyone"
              break;
            case "base":
              color = "green"
              title = `base model of ${record.scenario.name}`
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
      )
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Tooltip title="view details">
            <a
              href={`/model/view?id=${record.id}`}
            >
              Details
            </a>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Compare with other models">
            <a
              href={`/charts?id=${record.id}`}
            >
              Compare
            </a>
          </Tooltip>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure deleting this model?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onClickDelete(record.id, userToken, actionRef)}
          >
            <Tooltip title="delete model">
              <Button type="link" danger style={{ padding: 0 }}>
                Delete
              </Button>
            </Tooltip>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper
      subTitle="The table of all models available to you."
      content="This table includes the models you created, all public models and base scenario models.
       You can check them in details, compare their results, or delete the models created by you.
       Some features will be disabled when you view this with a mobile device"
    >
      <IntlProvider value={enUSIntl}>
        <RouteContext.Consumer>
          {
            ({ isMobile }) => (
              <ProTable
                scroll={{ x: 'max-content' }}
                headerTitle="Model Overview"
                actionRef={actionRef}
                rowKey="key"
                onChange={(_, _filter, _sorter) => {
                  const sorterResult = _sorter;
                  if (sorterResult.field) {
                    setSorter(`${sorterResult.field}_${sorterResult.order}`);
                  }
                }}
                params={{
                  sorter,
                }}
                toolBarRender={ isMobile ? false : (action, { selectedRows }) => [
                  <Button type="primary" onClick={handleCreate}>
                    <PlusOutlined /> New Model
                  </Button>,
                  <Select
                    mode="multiple"
                    showArrow
                    placeholder="Select model types"
                    style={{ minWidth: 240 }}
                    tagRender={TagRender}
                    value={types}
                    onChange={setTypes}
                    options={[
                      { label: 'geekblue', value: 'public' },
                      { label: 'volcano', value: 'original' },
                      { label: 'green', value: 'base' },
                    ]}
                  />,
                  selectedRows && selectedRows.length > 0 && (
                    <Button onClick={() => handleViewBatch(selectedRows)}>
                      View/Compare results in group
                    </Button>
                  ),
                ]}
                tableAlertRender={ isMobile ? false : ({ selectedRowKeys, selectedRows }) => (
                  <div>
                    Selected{' '}
                    <a
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      {selectedRowKeys.length}
                    </a>{' '}
                    Model(s)&nbsp;&nbsp;
                  </div>
                )}
                request={params => queryModelList(params, userToken, types)
                  .then(response => ListResponseProcessing(response, userId))}
                columns={columns}
                rowSelection={ isMobile ? false : {}}
                search={false}
                pagination={{
                  showSizeChanger: false,
                  pageSize: 20
                }}
              />
            )
          }
        </RouteContext.Consumer>
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser
}))(OverviewList);
