import React, { useState, useEffect } from 'react';
import { Form, Button, Spin, Select } from 'antd';
import { getTownships } from '@/services/region';
import { connect } from 'react-redux';
import styles from '../../index.less';
import Map from '../../../../../../../components/Maps/FormMap';

const { Option } = Select;
const style = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const TownshipForm = (props) => {
  const { onSubmit, data = {} } = props;
  return (
    <Form
      {...style}
      layout="horizontal"
      className={styles.stepForm}
      onFinish={(values) => onSubmit('township', values)}
    >
      <Form.Item
        name="township-choice"
        label="Township"
        rules={[
          {
            required: true,
            message: 'Please choose at least one township or other region(s)',
          },
        ]}
        initialValue={data.hasOwnProperty('township-choice') ? data['township-choice'] : []}
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
  const [countyList, setList] = useState([]);
  const [mapData, setMapData] = useState([]);
  useEffect(() => {
    (async () => {
      const { results: townships } = await getTownships();
      setList(townships);
      setMapData(
        await townships.map((township) => {
          const data = township.geometry;
          data.properties.id = township.id;
          data.properties.name = township.name;
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

  return countyList.length > 0 && mapData.length > 0 ? (
    <>
      <Select
        showSearch
        placeholder="Select township(s)"
        optionFilterProp="children"
        value={value}
        onChange={onListChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        mode="multiple"
      >
        {countyList.map((county) => (
          <Option value={county.id} key={county.id}>
            {county.name}
          </Option>
        ))}
      </Select>
      <Map data={mapData} onChange={onMapSelect} values={value} />
    </>
  ) : (
    <Spin size="large" tip="loading townships data and map..." />
  );
};

export default connect(({ createModelForm }) => ({
  data: createModelForm.step,
}))(TownshipForm);
