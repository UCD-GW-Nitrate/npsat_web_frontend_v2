import { Table } from 'antd';
import React from 'react';

const TableWrapper = (props) => {
  return (
    <Table
      dataSource={[...props.data]}
      loading={props.loading}
      columns={[
        {
          title: 'Crops',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: 'Loading percentage',
          dataIndex: 'proportion',
          key: 'proportion',
          render: (num) => `${Math.round(parseFloat(num) * 100)}%`,
          sorter: (a, b) => parseFloat(a.proportion) - parseFloat(b.proportion),
        },
        // {
        //   title: "Land area percentage",
        //   dataIndex: 'land_area_proportion',
        //   key: 'land_area_proportion',
        //   render: num => (
        //     `${Math.round(parseFloat(num) * 100)}%`
        //   ),
        //   sorter: (a, b) => parseFloat(a.land_area_proportion) - parseFloat(b.land_area_proportion)
        // },
      ]}
      rowKey={(modification) => modification.crop}
      pagination={false}
    />
  );
};

export default TableWrapper;
