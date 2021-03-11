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
  return (
    <Form.Item {...props}>
      {data.length < 1 ? (
        <Spin size="large" tip="loading data and map..." />
      ) : (
        <>
          <Alert message="You are selecting the entire Central Valley area." type="success" />
          <Map data={data} onChange={() => {}} values={[data[0].properties.id]} />
        </>
      )}
    </Form.Item>
  );
};

export default CentralValleyFormItem;
