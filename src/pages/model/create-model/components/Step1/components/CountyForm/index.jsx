import React, { useState, useEffect } from 'react';
import { Form, Select, Button } from 'antd';
import { connect } from 'umi';
import { getCountyList } from '@/services/county'
import styles from '../../index.less';
import CountyMap from './components/CountyMap';

const { Option } = Select;

const CountyForm = (props) => {
  const { onSubmit, style, data } = props;
  const [ countyList, setList ] = useState([]);
  useEffect(() => {
    (async () => {
      const { results: counties } = await getCountyList();
      setList(counties);
    })();
  }, []);
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
        <SelectAndMap countyList={countyList}/>
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

const SelectAndMap = ({ value = "", onChange, countyList }) => {
  const [ item, setItem ] = useState(value);
  useEffect(() => {
    setItem(value);
  }, [value]);

  const onListChange = v => {
    setItem(v);
    if (onChange) {
      onChange(v);
    }
  }

  return (
    <>
      <Select
        showSearch
        placeholder="Select a county"
        optionFilterProp="children"
        value={item}
        onChange={onListChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {countyList.map(county => (
          <Option value={county.id} key={county.id}>{county.name}</Option>
        ))}
      </Select>
      <CountyMap />
    </>
  )
}


export default connect(({ createModelForm }) => ({
  data: createModelForm.step
}))(CountyForm);
