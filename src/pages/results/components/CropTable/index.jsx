import React, { useEffect, useState } from 'react';
import ProTable, { ConfigProvider, enUSIntl } from '@ant-design/pro-table';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import areaPerCrop from '@/pages/model/CropAreas/areaPerCrop';

const CropTable = ({ models }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const getRegions = (regions) => {
    var regionNames = [];
    regions.map((region) => {
      regionNames.push(region.mantis_id);
    });
    return regionNames;
  };

  const getCrops = (modifications) => {
    var cropCAML = [];
    modifications.map((m) => {
      cropCAML.push(m.crop.caml_code);
    });
    return cropCAML;
  };

  useEffect(() => {
    // data processor
    if (models && models.length > 0) {
      // map crop id to index in crops
      const cropMap = new Map();
      const crops = [];
      const modelColumns = [];
      models.forEach((model) => {
        const { modifications, name, regions } = model;
        const mapType = model.regions[0].region_type;
        const load_scenario = model.flow_scenario.scenario_type;//load_scenario type was assigned to flow_scenario, needs to be fixed 
        const cropAreas = areaPerCrop(getCrops(modifications), getRegions(regions), mapType, load_scenario);
        modifications.forEach((modification) => {
          if (!cropMap.has(modification.crop.id)) {
            cropMap.set(modification.crop.id, crops.length);
            crops.push({
              // to avoid duplicate names
              __crop_name__: modification.crop.name,
              [model.name]: modification.proportion,
              __id__: modification.id,
              area: cropAreas[modification.crop.caml_code ? modification.crop.caml_code : 0],
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
        {
          title: 'Crop area (Hectare)',
          dataIndex: 'area',
          key: 'area',
          render: (num) => `${Math.round(parseInt(num ? num : 0)*0.25)}`,
          sorter: (a, b) => parseInt(a.area) - parseInt(b.area),
        },
        {
          title: 'Crop area (Acre)',
          dataIndex: 'area',
          key: 'area',
          render: (num) => `${Math.round(parseInt(num ? num : 0)*0.25*2.47)}`,
          sorter: (a, b) => parseInt(a.area) - parseInt(b.area),
        },
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
