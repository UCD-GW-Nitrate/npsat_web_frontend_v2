import React, { useEffect, useState } from 'react';
import { getCentralValley } from '@/services/region';
import { Alert, Form, Spin } from 'antd';
import Map from '@/components/Maps/FormMap';

const style = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const CentralValleyFormItem = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const { results: cv } = await getCentralValley();
      setData(
        cv.map((item) => {
          const geojson = item.geometry;
          geojson.properties.id = item.id;
          return geojson;
        }),
      );
    })();
  }, []);
  return data.length < 1 ? (
    <div style={{ alignContent: 'center', justifyContent: 'center', display: 'flex' }}>
      <Spin size="large" tip="loading data and map..." />
    </div>
  ) : (
    <Form.Item
      {...props}
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
      name="CV"
      initialValue={data[0] && data[0].properties.id}
    >
      <>
        <Alert message="You are selecting the entire Central Valley area." type="success" />
        <Map data={data} onChange={() => {}} values={[data[0].properties.id]} />
      </>
    </Form.Item>
  );
};

export default CentralValleyFormItem;
