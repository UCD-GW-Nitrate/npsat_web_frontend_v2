import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Slider, InputNumber } from 'antd';

/**
 * Customized antd form item for ranges
 * @param value inherited from Form
 * @param onChange inherited from Form
 * @param rangeConfig config of this component { max, min, step, maxIdentifier(optional) }
 * @param maxIdentifier used when a very large max value is required
 * @returns {JSX.Element}
 * @constructor
 */
const RangeFormItem = ({ value = [], onChange, rangeConfig }) => {
  const { max, min, step, maxIdentifier = false } = rangeConfig;
  const [low, setLow] = useState(value.length === 0 ? min : value[0]);
  const [high, setHigh] = useState(value.length === 0 ? max : value[1]);

  // used to represent the maximum value
  const maxIdentifierFormatter = (num) => {
    if (maxIdentifier && num > max) {
      return 'max';
    }
    return num.toString();
  };

  useEffect(() => {
    // set range when initial values are not passed in at first
    setLow(value[0]);
    setHigh(value[1]);
  }, [value]);

  const lowOnChange = (lowBound) => {
    setLow(lowBound);
    if (onChange) {
      onChange([lowBound, high]);
    }
  };
  const highOnChange = (highBound) => {
    setHigh(highBound);
    if (onChange) {
      onChange([low, highBound]);
    }
  };
  const rangeOnChange = (range) => {
    setLow(range[0]);
    setHigh(range[1]);
    if (onChange) {
      onChange([...range]);
    }
  };

  return (
    <Row gutter={8}>
      <Col flex="auto">
        <Slider
          range
          value={[low, high]}
          max={maxIdentifier ? max + 1 : max}
          min={min}
          onChange={(v) => rangeOnChange(v)}
          tipFormatter={maxIdentifierFormatter}
        />
      </Col>
      <Col>
        min:{' '}
        <InputNumber
          value={low}
          step={step}
          onChange={(v) => lowOnChange(v)}
          style={{ width: 60 }}
          max={maxIdentifier ? max + 1 : max}
          min={min}
          formatter={maxIdentifierFormatter}
        />
        <span>  {parseInt(low * 3.28)}(ft)</span>
      </Col>
      <Col>
        max:{' '}
        <InputNumber
          value={high}
          step={step}
          onChange={(v) => highOnChange(v)}
          style={{ width: 60 }}
          max={maxIdentifier ? max + 1 : max}
          min={min}
          formatter={maxIdentifierFormatter}
        />
        <span>  {parseInt(high * 3.28)}(ft)</span>
      </Col>
    </Row>
  );
};

export default RangeFormItem;
