import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Divider, Dropdown, Menu, Popconfirm, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import ProTable, { enUSIntl, IntlProvider } from '@ant-design/pro-table';
import { getCountyDetail, getModelList } from '../../service';

const onClickDetails = (id) => {
  history.push({
    pathname: '/model/view',
    query: {
      id
    }
  })
};

const ListResponseProcessing = (response) => {
  const data = response.results;
  data.forEach(model => {
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
    model.crops = model.modifications.length;
    // (async () => {
    //   const { name } = await getCountyDetail({ id: model.county});
    //   model.county = name;
    // })();
  });
  return {
    data,
    total: response.count
  }
}

const ModelDetailList = (props) => {
  const { token } = props;
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
      title: 'Region',
      dataIndex: 'county',
      valueType: 'textarea'
    },
    {
      title: 'Num of crops',
      dataIndex: 'crops',
      valueType: 'textarea'
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Tooltip title="view details and modify model">
            <Button
              type="link"
              onClick={() => onClickDetails(record.id)}
            >
              Details
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <IntlProvider value={enUSIntl}>
        <ProTable
          options={false}
          headerTitle="Model List"
          rowKey="key"
          request={params => (getModelList(params, token).then(ListResponseProcessing))}
          columns={columns}
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

export default ModelDetailList;
