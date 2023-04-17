import { PlusOutlined, CopyOutlined, DownOutlined, BarChartOutlined } from '@ant-design/icons';
import { Button, Divider, message, Tooltip, Popconfirm, Tag, Select, Menu, Dropdown, Popover} from 'antd';
import React, { useState, useRef } from 'react';
import { history } from 'umi';
import { connect } from 'react-redux';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import TagRender from '@/components/ScenarioTag/TagRender';
import ListResponseProcessing from '@/components/ScenarioTag/ListResponseProcessing';
import { deleteModel, queryModelList } from './service';
import detailPopover from './DetailPopover';

/**
 * new scenario button logic
 * redirect page
 */
const handleCreate = () => {
  history.push('/model/create');
};

/**
 * used to create dropdown menu for action cols
 * @param {Object} record return value of {@link queryModelList}
 * @returns {JSX.Element} "more" button dropdown menu
 * @see {@link https://ant.design/components/dropdown ant design dropdown}
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
      <Tooltip title="Copy this scenario and modify its presets">
        <a href={`/model/modify?id=${record.id}`}>Copy & Modify</a>
      </Tooltip>
    </Menu.Item>
  </Menu>
);

/**
 * handle click: delete model
 * @param {number} id a number containing the id of the model
 * @param {string} token a string containing the user token
 * @param {Object} action a react ref
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
 * The main UI component for the Overview Page
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

  console.log("user overview list: ", user);

  const columns = [
    {
      title: 'Scenario Name',
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
          <Popover title="Scenario Info" content={detailPopover(record)}>
            <a href={`/model/view?id=${record.id}`}>Details</a> 
          </Popover>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure deleting this scenario?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onClickDelete(record.id, userToken, actionRef)}
            disabled={record.user !== userId}
          >
            <Tooltip
              title={record.user === userId ? 'Delete scenario' : 'The scenario belongs to another user'}
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
      subTitle="The table of all scenarios available to you."
      content="This table includes the scenarios you created, all public scenarios and base scenario scenarios.
       You can check them in details, compare their results, or delete the scenarios created by you.
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
              headerTitle="Scenario Overview"
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
                  setFilter(filterResult.status.map((num) => parseInt(num)));
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
                      <PlusOutlined /> New Scenario
                    </Button>,
                    <Select
                      mode="multiple"
                      showArrow
                      placeholder="Select scenario types"
                      style={{ minWidth: 240 }}
                      tagRender={TagRender}
                      value={types}
                      onChange={(value) => {
                        setTypes([...value]);
                        action.reload();
                      }}
                      options={[
                        { label: 'include public scenarios', value: 'public' },
                        { label: 'include self-created scenarios', value: 'original' },
                        { label: 'include base scenario scenarios', value: 'base' },
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
