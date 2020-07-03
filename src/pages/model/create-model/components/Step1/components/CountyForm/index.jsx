import React, { useState, useEffect } from 'react';
import { Form, Select, Button } from 'antd';
import { getCountyList } from '@/services/county'
import styles from '../../index.less';

const { Option } = Select;

const CountyForm = (props) => {
  const [ countyList, setList ] = useState([]);
  useEffect(() => {
    (async () => {
      const { results: counties } = await getCountyList();
      setList(counties);
    })();
  }, []);
  const { onSubmit, style } = props;
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
      >
        <Select
          showSearch
          placeholder="Select a county"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {countyList.map(county => (
            <Option value={county.id} key={county.id}>{county.name}</Option>
          ))}
        </Select>
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

export default CountyForm;
