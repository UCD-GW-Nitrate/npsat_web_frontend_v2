import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Spin } from 'antd';
import { getCVHMFarms, REGION_MACROS } from '@/services/region';
import { connect } from 'react-redux';
import styles from '../index.less';
import Map from '../../../../../components/Maps/FormMap';

const { Option } = Select;
const style = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const SubRegionForm = (props) => {
  const { onSubmit, data = {} } = props;
  return (
    <Form
      {...style}
      layout="horizontal"
      className={styles.stepForm}
      onFinish={(values) => onSubmit(REGION_MACROS.CVHM_FARM, values)}
    >
      <Form.Item
        name={`region-${REGION_MACROS.CVHM_FARM}-choice`}
        label="Subregion"
        rules={[
          {
            required: true,
            message: 'Please choose at least one subregion or other region(s)',
          },
        ]}
        initialValue={
          data.hasOwnProperty(`region-${REGION_MACROS.CVHM_FARM}-choice`)
            ? data[`region-${REGION_MACROS.CVHM_FARM}-choice`]
            : []
        }
      >
        <SelectAndMap />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: style.wrapperCol.span,
            offset: style.labelCol.span,
          },
        }}
      >
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

const SelectAndMap = ({ value = [], onChange }) => {
  const [farmList, setList] = useState([]);
  const [mapData, setMapData] = useState([]);
  useEffect(() => {
    (async () => {
      const { results: farms } = await getCVHMFarms();
      setList(farms);
      setMapData(
        await farms.map((farm) => {
          const data = farm.geometry;
          data.properties.id = farm.id;
          data.properties.name = farm.name;
          return data;
        }),
      );
    })();
  }, []);
  const onListChange = (v) => {
    if (onChange) {
      onChange(v);
    }
  };
  const onMapSelect = (selectingMap, selectedMaps) => {
    if (onChange) {
      if (selectedMaps.indexOf(selectingMap) === -1) {
        onChange([...selectedMaps, selectingMap]);
      } else {
        onChange([
          ...selectedMaps.slice(0, selectedMaps.indexOf(selectingMap)),
          ...selectedMaps.slice(selectedMaps.indexOf(selectingMap) + 1),
        ]);
      }
    }
  };
  return farmList.length > 0 && mapData.length > 0 ? (
    <>
      <Select
        showSearch
        placeholder="Select a subregion"
        optionFilterProp="children"
        value={value}
        onChange={onListChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        mode="multiple"
      >
        {farmList.map((farm) => (
          <Option value={farm.id} key={farm.id}>
            {farm.name}
          </Option>
        ))}
      </Select>
      <Map data={mapData} onChange={onMapSelect} values={value} />
    </>
  ) : (
    <Spin size="large" tip="loading farm data and map..." />
  );
};

export const CreateModelFarmForm = connect(({ createModelForm }) => ({
  data: createModelForm.step,
}))(SubRegionForm);

export const CopyModelFarmForm = connect(({ copyAndModifyModelForm }) => ({
  data: copyAndModifyModelForm.step,
}))(SubRegionForm);
