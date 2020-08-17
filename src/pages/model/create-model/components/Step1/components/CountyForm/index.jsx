import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { getCounties } from '@/services/region'
import styles from '../../index.less';
import CountyMap from '../FormMap';

const { Option } = Select;
const style = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const CountyForm = (props) => {
  const { onSubmit, data = {} } = props;
  return (
    <Form
      {...style}
      layout="horizontal"
      className={styles.stepForm}
      onFinish={(values) => onSubmit("county", values)}
    >
      <Form.Item
        name="county-choice"
        label="County"
        rules={[
          {
            required: true,
            message: "Please choose a county"
          }
        ]}
        initialValue={
          data.hasOwnProperty("county-choice") ? data["county-choice"] : undefined
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
}

const SelectAndMap = ({ value, onChange }) => {
  const [ countyList, setList ] = useState([]);
  const [ mapData, setMapData ] = useState([]);
  useEffect(() => {
    (async () => {
      const { results: counties } = await getCounties();
      setList(counties);
      setMapData(await counties.map(county => {
        const data = county.geometry;
        data.properties.id = county.id
        return data;
      }));
    })();
  }, []);
  const onListChange = v => {
    if (onChange) {
      onChange(v);
    }
  }

  return countyList.length > 0 && mapData.length > 0 ? (
    <>
      <Select
        showSearch
        placeholder="Select a county"
        optionFilterProp="children"
        value={value}
        onChange={onListChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {countyList.map(county => (
          <Option value={county.id} key={county.id}>{county.name}</Option>
        ))}
      </Select>
      <CountyMap data={mapData} onChange={onChange} value={value}/>
    </>
  ) : <Spin size="large" tip="loading county data and map..."/>
}


export default connect(({ createModelForm }) => ({
  data: createModelForm.step
}))(CountyForm);
