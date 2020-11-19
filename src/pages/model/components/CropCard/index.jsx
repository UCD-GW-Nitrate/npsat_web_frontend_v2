import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Slider, InputNumber, Switch, Row, Col } from 'antd';

export const formatter = (value) => `${value}%`;

const CropCard = ({
  name,
  id,
  onChange,
  values,
  required = false,
  displayMode = false,
  initialValues = {
    load: 100,
    area: 100,
    enable: true,
  },
}) => {
  const [load, setLoad] = useState(initialValues.load);
  const [area, setArea] = useState(initialValues.area);
  const [enable, setEnable] = useState(initialValues.enable || required);

  useEffect(() => {
    setLoad(initialValues.load);
  }, [initialValues.load]);
  useEffect(() => {
    setArea(initialValues.area);
  }, [initialValues.area]);
  useEffect(() => {
    setEnable(initialValues.enable || required);
  }, [initialValues.enable, required]);

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        ...values,
        [id]: {
          load,
          area,
          enable,
          ...changedValue,
        },
      });
    }
  };

  useEffect(() => {
    triggerChange(initialValues)
  }, [])

  const changeLoad = displayMode
    ? setLoad
    : (value) => {
        const newLoad = value;
        setLoad(newLoad);
        if (enable) {
          triggerChange({ load: newLoad });
        }
      };

  const changeArea = displayMode
    ? setArea
    : (value) => {
        const newArea = value;
        setArea(newArea);
        if (enable) {
          triggerChange({ area: newArea });
        }
      };

  const toggleEnable = (value) => {
    setEnable(value);
    triggerChange({
      area,
      load,
      enable: value,
    });
  };

  return (
    <Card
      hoverable
      size="small"
      title={name}
      extra={
        displayMode || required ? null : (
          <Switch
            onChange={toggleEnable}
            checked={enable}
            checkedChildren="enabled"
            unCheckedChildren="disabled"
          />
        )
      }
    >
      <Row gutter={16}>
        <Col span={6}>Loading</Col>
        <Col span={8}>
          <Slider
            max={200}
            min={0}
            marks={{
              0: '0%',
              200: '200%',
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
      {/*<Row gutter={16}>*/}
      {/*  <Col span={6}>*/}
      {/*    Percent of area to apply change*/}
      {/*  </Col>*/}
      {/*  <Col span={8}>*/}
      {/*    <Slider*/}
      {/*      max={100}*/}
      {/*      min={0}*/}
      {/*      marks={{*/}
      {/*        0: '0%',*/}
      {/*        100: '100%'*/}
      {/*      }}*/}
      {/*      tipFormatter={formatter}*/}
      {/*      onChange={changeArea}*/}
      {/*      value={area}*/}
      {/*      disabled={displayMode}*/}
      {/*    />*/}
      {/*  </Col>*/}
      {/*  <Col span={4}>*/}
      {/*    <InputNumber*/}
      {/*      min={0}*/}
      {/*      max={100}*/}
      {/*      style={{ margin: '0 16px' }}*/}
      {/*      value={area}*/}
      {/*      formatter={formatter}*/}
      {/*      onChange={changeArea}*/}
      {/*      disabled={displayMode}*/}
      {/*    />*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </Card>
  );
};

export default CropCard;
