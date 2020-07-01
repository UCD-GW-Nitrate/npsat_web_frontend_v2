import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { history, connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, {IntlProvider, enUSIntl,} from '@ant-design/pro-table';
import { queryModelList, queryRule, removeRule } from './service';

/**
 * delete model
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('Deleting...');
  if (!selectedRows) return true;

  console.log(selectedRows);

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('Model deleted. Refreshing...');
    return true;
  } catch (error) {
    hide();
    message.error('Model deletion failed, please try again');
    return false;
  }
};

/**
 * handle crate new model button
 * redirect page
 */
const handleCreate = () => {
  history.push('/model/create');
}

const ListResponseProcessing = (response) => {
  const data = response.results;
  data.forEach(model => {
    if (model.complete) {
      model.status = 2;
    } else if (model.running) {
      model.status = 1;
    } else if (model.ready) {
      model.status = 0;
    } else {
      model.status = 3;
    }
    model.key = model.id
  });
  return {
    data,
    total: response.count
  }
}

const OverviewList = props => {
  const { userToken } = props;
  const [sorter, setSorter] = useState('');
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: 'Ready',
          status: 'Default',
        },
        1: {
          text: 'Pending',
          status: 'Processing',
        },
        2: {
          text: 'Complete',
          status: 'Success',
        },
        3: {
          text: 'Unknown',
          status: 'Error'
        }
      },
    },
    {
      title: 'Date Created',
      dataIndex: 'date_submitted',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: 'Date Completed',
      dataIndex: 'date_completed',
      sorter: true,
      valueType: 'dateTime'
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button>
            Details
          </Button>
          <Divider type="vertical" />
          <Button>
            Results
          </Button>
          <Divider type="vertical" />
          <Button type="link" danger>
            Delete
          </Button>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <IntlProvider value={enUSIntl}>
        <ProTable
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
          toolBarRender={(action, { selectedRows }) => [
            <Button type="primary" onClick={handleCreate}>
              <PlusOutlined /> New Model
            </Button>,
            selectedRows && selectedRows.length > 0 && (
              <Dropdown
                overlay={
                  <Menu
                    onClick={async e => {
                      if (e.key === 'remove') {
                        await handleRemove(selectedRows);
                        action.reload();
                      }
                    }}
                    selectedKeys={[]}
                  >
                    <Menu.Item key="remove">Delete models</Menu.Item>
                    <Menu.Item key="approval">View results</Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  Batch Operation <DownOutlined />
                </Button>
              </Dropdown>
            ),
          ]}
          tableAlertRender={({ selectedRowKeys, selectedRows }) => (
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
          request={params => (queryModelList(params, userToken).then(ListResponseProcessing))}
          columns={columns}
          rowSelection={{}}
          search={false}
          pagination={{
            showSizeChanger: false,
            pageSize: 20
          }}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default connect(({ user }) => ({
  userToken: user.currentUser.token
}))(OverviewList);
