import React from 'react';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import { Card } from 'antd';

const RecentModelTable = ({ title, data, columns, extra = null }) => {
  return (
    <Card title={title} extra={extra}>
      <ConfigProvider value={{ intl: enUSIntl }}>
        <ProTable
          size="small"
          columns={columns}
          dataSource={data}
          rowKey="id"
          search={false}
          options={false}
          pagination={false}
        />
      </ConfigProvider>
    </Card>
  );
};

export default RecentModelTable;
