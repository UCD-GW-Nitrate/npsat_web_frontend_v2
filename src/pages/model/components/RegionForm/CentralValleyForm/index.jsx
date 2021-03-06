import React, { useState, useEffect } from 'react';
import { Form, Button, Spin, Alert } from 'antd';
import { getCentralValley, REGION_MACROS } from '@/services/region';
import styles from '../index.less';
import Map from '../../../../../components/Maps/FormMap';

const style = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const CentralValleyForm = (props) => {
  const { onSubmit } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const { results: cv } = await getCentralValley();
      setData(
        await cv.map((item) => {
          const geojson = item.geometry;
          geojson.properties.id = item.id;
          return geojson;
        }),
      );
    })();
  }, []);
  return (
    <Form
      {...style}
      layout="horizontal"
      className={styles.stepForm}
      onFinish={() => onSubmit(REGION_MACROS.CENTRAL_VALLEY, { CV: data[0].properties.id })}
    >
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
        {data.length < 1 ? (
          <Spin size="large" tip="loading data and map..." />
        ) : (
          <>
            <Alert message="You are selecting the entire Central Valley area." type="success" />
            <Map data={data} onChange={() => {}} values={[data[0].properties.id]} />
          </>
        )}
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

export default CentralValleyForm;
