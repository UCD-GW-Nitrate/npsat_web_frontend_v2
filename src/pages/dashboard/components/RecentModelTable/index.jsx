import React from 'react';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import { Card } from 'antd';

/**
 * A components that has basic structure for recent models displayed in a table.
 * The component uses the structure of AntD Pro table. Check ProTable for more usage.
 * @param title
 * @param data
 * @param columns
 * @param extra
 * @returns {JSX.Element}
 * @constructor
 */
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
