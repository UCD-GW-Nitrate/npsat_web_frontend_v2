import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Slider, InputNumber, Switch, Row, Col } from 'antd';


export const formatter = (value) => `${value}%`;

const CropCard = ({ name, id, onChange, values, required = false, initialValues, cropAreas, cropCaml }) => {

  console.log("cropAreas", cropAreas);
  console.log("cropCaml", cropCaml);

  const [enable, setEnable] = useState(initialValues.enable || required);
  useEffect(() => {
    setEnable(initialValues.enable || required);
  }, [initialValues.enable, required]);


  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        ...values,
        [id]: {
          ...values[id],
          ...changedValue,
        },
      });
    }
  };

  const changeLoad = (value) => triggerChange({ load: value });

  const toggleEnable = (value) => {
    setEnable(value);
    triggerChange({
      enable: value,
    });
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Card
      hoverable
      size="small"
      title={name}
      extra={
        required ? (
          <span>
            {numberWithCommas(parseInt(cropAreas[0]*0.25))} ha/
            {numberWithCommas(parseInt(cropAreas[0]*0.25*2.47))} ac
          </span>) : (
          <Row>
            <Col span={15}>
              {cropAreas[cropCaml] ? numberWithCommas(parseInt(cropAreas[cropCaml]*0.25)) : 0} ha/
              {cropAreas[cropCaml] ? numberWithCommas(parseInt(cropAreas[cropCaml]*0.25*2.47)) : 0} ac
            </Col>
            <Col span={10}>
              <Switch
                onChange={toggleEnable}
                checked={enable}
                checkedChildren="enabled"
                unCheckedChildren="disabled"
              />
            </Col>
          </Row>
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
            value={initialValues.load}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={200}
            style={{ margin: '0 16px' }}
            value={initialValues.load}
            formatter={formatter}
            onChange={changeLoad}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CropCard;

