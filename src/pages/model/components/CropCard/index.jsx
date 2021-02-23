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
  initialValues,
}) => {
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

  return (
    <Card
      hoverable
      size="small"
      title={name}
      extra={
        required ? null : (
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
