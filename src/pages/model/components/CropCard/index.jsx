import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Slider, Row, Col } from 'antd';

const formatter = (value) => (`${value}%`)

const CropCard = (props) => {
  const {
    name,
    id,
    handleDelete,
    getValues,
  } = props;

  const [ load, setLoad ] = useState(0);
  const [ area, setArea] = useState(0);

  return (
    <Card
      hoverable
      size="small"
      title={name}
    >
      <Row

      >
        <Col span={8}>
          Loading
        </Col>
        <Col span={12}>
          <Slider
            max={200}
            min={0}
            marks={{
              0: '0%',
              200: '200%'
            }}
            tipFormatter={formatter}
            tooltipVisible
            onChange={setLoad}
            style={{
              width: 100
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          Percent of area to apply change
        </Col>
        <Col span={12}>
          <Slider
            max={100}
            min={0}
            marks={{
              0: '0%',
              100: '100%'
            }}
            tipFormatter={formatter}
            tooltipVisible
            onChange={setArea}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CropCard;
