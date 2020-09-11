import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Tooltip, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { history } from 'umi';
import { connect } from 'react-redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, {IntlProvider, enUSIntl,} from '@ant-design/pro-table';
import { deleteModel, queryModelList } from './service';

/**
 * delete model
 * @param selectedRows
 */
// const handleRemoveBatch = async (selectedRows, token) => {
//   if (!selectedRows) return true;
//
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < selectedRows.length; i++) {
//     const hide = message.loading(`Deleting ${selectedRows[i].name}...`);
//     deleteModel({ id: selectedRows[i].id }, token)
//       .catch(() => {
//         hide();
//         message.error(`Model ${selectedRows[i].name} deletion failed`)
//       })
//       .then(
//       () => {
//         message.success(`Model ${selectedRows[i].name} deleted`);
//         hide();
//       }
//     );
//   }
//   return true;
// };

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

const ListResponseProcessing = (response) => {
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
    data.push(model);
  });
  return {
    data,
    total: response.count
  }
}

/**
 * handle click: check results of a model
 * @param id
 */
const onClickResults = (id) => {
  history.push({
    pathname: '/charts',
    query: {
      id
    }
  })
};

/**
 * handle click: check details of a model
 * @param id
 */
const onClickDetails = (id) => {
  history.push({
    pathname: '/model/view',
    query: {
      id
    }
  })
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
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Tooltip title="view details">
            <Button
              type="link"
              onClick={() => onClickDetails(record.id)}
            >
              Details
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Compare with other models">
            <Button
              type="link"
              disabled={record.status !== 3}
              onClick={() => onClickResults(record.id)}
            >
              Compare
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure deleting this model?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onClickDelete(record.id, userToken, actionRef)}
          >
            <Tooltip title="delete model">
              <Button type="link" danger>
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
       You can check them in details, compare their results, or delete the models created by you"
    >
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
                <Button onClick={() => handleViewBatch(selectedRows)}>
                  View/Compare results in group
                </Button>
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
