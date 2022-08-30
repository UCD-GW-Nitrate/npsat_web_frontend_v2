import { PlusOutlined, CopyOutlined, DownOutlined, BarChartOutlined } from '@ant-design/icons';
import { Button, Divider, message, Tooltip, Popconfirm, Tag, Select, Menu, Dropdown } from 'antd';
import React, { useState, useRef } from 'react';
import { history } from 'umi';
import { connect } from 'react-redux';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import { deleteModel, queryModelList } from './service';

/**
 * handle crate new model button
 * redirect page
 */
const handleCreate = () => {
  history.push('/model/create');
};

/**
 * used to create dropdown menu for action cols
 * @param record
 * @returns {JSX.Element} Action for "Compare", "Delete", "Copy & Modify"
 */
const createModelMenu = (record) => (
  <Menu>
    <Menu.Item disabled={record.is_base} icon={<BarChartOutlined />}>
      <Tooltip title={record.is_base ? 'This a BAU' : 'Compare with BAU'}>
        <a
          href={`/compare/BAU?id=${record.id}`}
          style={{
            cursor: record.is_base ? 'not-allowed' : 'pointer',
            pointerEvents: record.is_base ? 'none' : 'inherit',
          }}
        >
          Compare
        </a>
      </Tooltip>
    </Menu.Item>
    <Menu.Item icon={<CopyOutlined />}>
      <Tooltip title="Copy this model and modify its presets">
        <a href={`/model/modify?id=${record.id}`}>Copy & Modify</a>
      </Tooltip>
    </Menu.Item>
  </Menu>
);

/**
 * render tags
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
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

/**
 * additional processor for antd pro table
 * @param response
 * @param userId
 * @returns {{total, data: []}}
 * @constructor
 */
const ListResponseProcessing = (response, userId) => {
  const { results } = response;
  const data = [];
  results.forEach((temp) => {
    const model = temp;
    model.key = model.id;
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

/**
 * handle click: delete model
 * @param id
 * @param token
 * @param action
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
};

/**
 * major UI components for overview page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const OverviewList = (props) => {
  const { user } = props;
  const { token: userToken, user_id: userId } = user;
  const [sorter, setSorter] = useState('');
  // this is only the status filter
  const [filter, setFilter] = useState([0, 1, 2, 3, 4]);
  const [types, setTypes] = useState(['public', 'base', 'original']);
  const actionRef = useRef();
  const columns = [
    {
      title: 'Model Name',
      dataIndex: 'name',
      valueType: 'textarea',
      width: 250,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
      width: 250,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: true,
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
                title = `BAU of ${record.flow_scenario.name}, ${record.load_scenario.name}, ${record.unsat_scenario.name}, ${record.welltype_scenario.name}`;
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
      render: (_, record) => (
        <>
          <Tooltip title="View details & results">
            <a href={`/model/view?id=${record.id}`}>Details</a>
          </Tooltip>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure deleting this model?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onClickDelete(record.id, userToken, actionRef)}
            disabled={record.user !== userId}
          >
            <Tooltip
              title={record.user === userId ? 'Delete model' : 'The model belongs to another user'}
            >
              <Button type="link" danger style={{ padding: 0 }} disabled={record.user !== userId}>
                Delete
              </Button>
            </Tooltip>
          </Popconfirm>
          <Divider type="vertical" />
          <Dropdown overlay={createModelMenu(record)}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              More <DownOutlined />
            </a>
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper
      subTitle="The table of all models available to you."
      content="This table includes the models you created, all public models and base scenario models.
       You can check them in details, compare their results, or delete the models created by you.
       Some features will be disabled if you view this page with a mobile device"
    >
      <ConfigProvider
        value={{
          intl: enUSIntl,
        }}
      >
        <RouteContext.Consumer>
          {({ isMobile }) => (
            <ProTable
              scroll={{ x: 'max-content' }}
              headerTitle="Model Overview"
              actionRef={actionRef}
              rowKey="key"
              onChange={(_, _filter, _sorter) => {
                const sorterResult = _sorter;
                const filterResult = _filter;
                if (sorterResult.order) {
                  setSorter(`${sorterResult.field},${sorterResult.order}`);
                } else {
                  setSorter('');
                }
                if (filterResult.status) {
                  setFilter(filterResult.status.map((num) => parseInt(num, 10)));
                } else {
                  setFilter([0, 1, 2, 3, 4]);
                }
              }}
              pagination={{
                defaultPageSize: 10,
              }}
              toolBarRender={
                isMobile
                  ? false
                  : (action, { selectedRows }) => [
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
                        onChange={(value) => {
                          setTypes([...value]);
                          action.reload();
                        }}
                        options={[
                          { label: 'include public models', value: 'public' },
                          { label: 'include self-created models', value: 'original' },
                          { label: 'include base scenario models', value: 'base' },
                        ]}
                      />,
                    ]
              }
              tableAlertRender={false}
              request={(params) =>
                queryModelList(params, types, userToken, sorter, filter).then((response) =>
                  ListResponseProcessing(response, userId),
                )
              }
              columns={columns}
              rowSelection={false}
              search={false}
            />
          )}
        </RouteContext.Consumer>
      </ConfigProvider>
    </PageHeaderWrapper>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(OverviewList);
