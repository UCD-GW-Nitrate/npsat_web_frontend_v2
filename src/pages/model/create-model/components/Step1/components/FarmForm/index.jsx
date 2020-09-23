import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Spin } from 'antd';
import { getCVHMFarms } from '@/services/region';
import { connect } from 'react-redux';
import styles from '../../index.less';
import Map from '../FormMap';

const { Option } = Select;
const style = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const FarmForm = (props) => {
  const { onSubmit, data = {} } = props;
  return (
    <Form
      {...style}
      layout="horizontal"
      className={styles.stepForm}
      onFinish={(values) => onSubmit('farm', values)}
    >
      <Form.Item
        name="farm-choice"
        label="Farm"
        rules={[
          {
            required: true,
            message: 'Please choose at least one farm or other region(s)',
          },
        ]}
        initialValue={data.hasOwnProperty('farm-choice') ? data['farm-choice'] : []}
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
        placeholder="Select a farm"
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

export default connect(({ createModelForm }) => ({
  data: createModelForm.step,
}))(FarmForm);
