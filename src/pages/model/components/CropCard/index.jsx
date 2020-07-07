import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Slider, InputNumber, Switch, Row, Col } from 'antd';

const formatter = (value) => (`${value}%`)

const CropCard = (props) => {
  const {
    name,
    id,
    onChange,
    values,
    displayMode = false
  } = props;

  const [ load, setLoad ] = useState(0);
  const [ area, setArea] = useState(0);
  const [ enable, setEnable ] = useState(true);

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange(
        {
          ...values,
          [id]: {
            load,
            area,
            enable,
            ...changedValue
          }
        }
      );
    }
  }

  const changeLoad = displayMode ? setLoad : value => {
    const newLoad = value;
    setLoad(newLoad);
    if (enable) {
      triggerChange({ load: newLoad })
    }
  }

  const changeArea = displayMode ? setArea : value => {
    const newArea = value;
    setArea(newArea);
    if (enable) {
      triggerChange({ area: newArea })
    }
  }

  const toggleEnable = value => {
    setEnable(value);
    if (value) {
      triggerChange({
        area,
        load,
        enable: value
      })
    }
  }

  return (
    <Card
      hoverable
      size="small"
      title={name}
      extra={displayMode ? null :
        <Switch
          defaultChecked
          onChange={toggleEnable}
          checked={enable}
          checkedChildren="enabled"
          unCheckedChildren="disabled"
        />
      }
    >
      <Row>
        <Col span={3}>
          Loading
        </Col>
        <Col span={6}>
          <Slider
            max={200}
            min={0}
            marks={{
              0: '0%',
              200: '200%'
            }}
            tipFormatter={formatter}
            onChange={changeLoad}
            value={load}
            disabled={displayMode}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={200}
            style={{ margin: '0 16px' }}
            value={load}
            formatter={formatter}
            onChange={changeLoad}
            disabled={displayMode}
          />
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          Percent of area to apply change
        </Col>
        <Col span={6}>
          <Slider
            max={100}
            min={0}
            marks={{
              0: '0%',
              100: '100%'
            }}
            tipFormatter={formatter}
            onChange={changeArea}
            value={area}
            disabled={displayMode}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={100}
            style={{ margin: '0 16px' }}
            value={area}
            formatter={formatter}
            onChange={changeArea}
            disabled={displayMode}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CropCard;
