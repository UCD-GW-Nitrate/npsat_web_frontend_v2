import React, { useEffect, useState } from 'react';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const CropTable = ({ models }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    // data processor
    if (models && models.length > 0) {
      // map crop id to index in crops
      const cropMap = new Map();
      const crops = [];
      const modelColumns = [];
      models.forEach((model) => {
        const { modifications, name } = model;
        modifications.forEach((modification) => {
          if (!cropMap.has(modification.crop.id)) {
            cropMap.set(modification.crop.id, crops.length);
            crops.push({
              // to avoid duplicate names
              __crop_name__: modification.crop.name,
              [model.name]: modification.proportion,
              __id__: modification.id,
            });
          } else {
            crops[cropMap.get(modification.crop.id)][model.name] = modification.proportion;
          }
        });
        modelColumns.push({
          title: `Loading of ${name}`,
          dataIndex: name,
          render: (num) =>
            num ? (
              `${Math.round(parseFloat(num) * 100)}%`
            ) : (
              <>
                Not specified{' '}
                <Tooltip title="The creator didn't specify the loading of this corp, so it is the same as 'All other crops'.">
                  <InfoCircleOutlined />
                </Tooltip>
              </>
            ),
          sorter: (a, b) => parseFloat(a[name]) - parseFloat(b[name]),
        });
      });
      setData(crops);
      setColumns([
        {
          title: 'Crop',
          dataIndex: '__crop_name__',
        },
        ...modelColumns,
      ]);
    }
  }, [models]);
  return (
    <ConfigProvider value={{ intl: enUSIntl }}>
      <ProTable
        columns={columns}
        rowKey="__id__"
        dataSource={data}
        scroll={{
          x: 'max-content',
        }}
        bordered
        search={false}
        options={false}
        pagination={false}
      />
    </ConfigProvider>
  );
};

export default CropTable;
