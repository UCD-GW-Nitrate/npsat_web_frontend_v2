import { Table } from 'antd';
import React from 'react';

const TableWrapper = props => {
  return (
    <Table
      dataSource={[...props.data]}
      loading={props.loading}
      columns={[
        {
          title: 'Crops',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: "Loading percentage",
          dataIndex: 'proportion',
          key: 'proportion',
          render: num => (
            `${parseFloat(num) * 100}%`
          )
        },
        {
          title: "Land area percentage",
          dataIndex: 'land_area_proportion',
          key: 'land_area_proportion',
          render: num => (
            `${parseFloat(num) * 100}%`
          )
        },
      ]}
      rowKey={modification => modification.crop}
      pagination={false}
    />
  );
}

export default TableWrapper;
