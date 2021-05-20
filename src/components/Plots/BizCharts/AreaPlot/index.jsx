import { Chart, Tooltip, Annotation, Legend, Axis, Area, Slider, Line } from 'bizcharts';
import { Button, Select, Divider, Form, Row, Col, Checkbox, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { isObjectEmpty, ordinalSuffix } from '@/utils/utils';
import 'antd/es/style/themes/default.less';
import { useForm } from 'antd/es/form/Form';
import styles from './index.less';

// usage: pass plot data, percentile list, and additional info
/**
 * Area plot
 * @param percentiles: an array of percentiles
 * @param data: an array of data
 * @param additionalInfo: an object containing any additional info
 * @returns {JSX.Element}
 * @constructor
 */
const AreaPlot = ({ percentiles, data, additionalInfo }) => {
  const [form] = useForm();
  const [values, setValues] = useState({
    upperBound: 0,
    lowerBound: 0,
    existMedian: false,
    median: 0,
  });
  const [areas, setPlot] = useState([]);
  useEffect(() => {
    if (!(isObjectEmpty(data) || values.upperBound === 0 || values.lowerBound === 0)) {
      if (values.median !== 0) {
        // split low, med, up
        const med = data[values.median];
        const temp = med.map((d, index) => ({
          year: d.year,
          value: [data[values.lowerBound][index].value, d.value],
          interval: `${ordinalSuffix(values.lowerBound)}-${ordinalSuffix(values.median)}`,
        }));
        const res = temp.concat(
          med.map((d, index) => ({
            year: d.year,
            value: [d.value, data[values.upperBound][index].value],
            interval: `${ordinalSuffix(values.median)}-${ordinalSuffix(values.upperBound)}`,
          })),
        );
        setPlot(res);
      } else {
        // split low, up
        const temp = data[values.upperBound].map((d, index) => ({
          year: d.year,
          value: [data[values.lowerBound][index].value, d.value],
          interval: `${ordinalSuffix(values.lowerBound)}-${ordinalSuffix(values.upperBound)}`,
        }));
        setPlot(temp);
      }
    } else {
      setPlot([]);
    }
  }, [values]);
  return (
    <div className={styles.linePlot}>
      <div className={styles.linePlotSelect}>
        <Form
          form={form}
          onValuesChange={(_, { upperBound, lowerBound, enableMedian }) => {
            const update = {};
            // check boundary
            if (upperBound && lowerBound && upperBound > lowerBound) {
              update.upperBound = upperBound;
              update.lowerBound = lowerBound;
            } else {
              update.upperBound = 0;
              update.lowerBound = 0;
            }
            // check median
            if (upperBound && lowerBound && percentiles.includes((upperBound + lowerBound) / 2)) {
              update.existMedian = true;
              if (enableMedian) {
                update.median = (upperBound + lowerBound) / 2;
              } else {
                update.median = 0;
              }
            } else {
              update.existMedian = false;
              update.median = 0;
            }
            setValues({
              ...values,
              ...update,
            });
          }}
        >
          <Row gutter={40} className={styles.rowAdjust}>
            <Col span={10}>
              <Form.Item name="lowerBound" label="Lower bound">
                <Select placeholder="Select percentile lower bound">
                  {percentiles.map((percentile) => (
                    <Select.Option value={percentile} key={percentile}>
                      {`${ordinalSuffix(percentile)} percentile`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="upperBound"
                label="Upper bound"
                dependencies={['lowerBound']}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('lowerBound') < value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Upper bound must be greater than lower bound');
                    },
                  }),
                ]}
              >
                <Select placeholder="Select percentile upper bound">
                  {percentiles.map((percentile) => (
                    <Select.Option value={percentile} key={percentile}>
                      {`${ordinalSuffix(percentile)} percentile`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Median" name="enableMedian" valuePropName="checked">
                <Checkbox disabled={!values.existMedian}>
                  <Popover content="some median percentiles may not be supported">
                    <QuestionCircleOutlined />
                  </Popover>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.utilityButtons}>
            <Button
              type="primary"
              style={{ marginRight: '10px' }}
              onClick={() => {
                setValues({
                  upperBound: 95,
                  lowerBound: 5,
                  existMedian: true,
                  median: 50,
                });
                form.setFieldsValue({
                  upperBound: 95,
                  lowerBound: 5,
                  enableMedian: true,
                });
              }}
            >
              Select 5th, 50th, 95th
            </Button>
            <Button
              onClick={() => {
                setValues({
                  upperBound: 90,
                  lowerBound: 10,
                  existMedian: true,
                  median: 50,
                });
                form.setFieldsValue({
                  upperBound: 90,
                  lowerBound: 10,
                  enableMedian: true,
                });
              }}
            >
              Select 10th, 50th, 90th
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={() => {
                setValues({
                  upperBound: 0,
                  lowerBound: 0,
                  existMedian: false,
                  median: 0,
                });
                form.setFieldsValue({
                  upperBound: undefined,
                  lowerBound: undefined,
                  enableMedian: false,
                });
              }}
            >
              Clear
            </Button>
          </div>
        </Form>
        <Divider />
      </div>
      <Chart
        padding={[10, 20, 50, 60]}
        autoFit
        height={500}
        data={areas}
        scale={{
          value: { min: 0, alias: 'Concentration of Nitrate as N [mg/L]', nice: true },
          year: { tickCount: 10, sync: true },
        }}
        placeholder={<div className={styles.noDateEntry}>Select from above percentile list</div>}
        defaultInteractions={['tooltip', 'element-highlight', 'legend-highlight']}
        pure
      >
        <Area position="year*value" color="interval" />
        <Line position="year*value" color="interval" />
        <Tooltip showCrosshairs shared />
        <Axis name="value" title />
        <Axis name="year" />
        <Legend position="top" />
        {additionalInfo && additionalInfo.reduction_start_year && !additionalInfo.is_base ? (
          <Annotation.Line
            start={[additionalInfo.reduction_start_year, 'min']}
            end={[additionalInfo.reduction_start_year, 'max']}
            text={{
              position: '60%',
              content: 'implementation start year',
              style: { fill: 'red' },
              autoRotate: true,
            }}
          />
        ) : null}
        {additionalInfo && additionalInfo.reduction_end_year && !additionalInfo.is_base ? (
          <Annotation.Line
            start={[additionalInfo.reduction_end_year, 'min']}
            end={[additionalInfo.reduction_end_year, 'max']}
            text={{
              position: '60%',
              content: 'implementation complete year',
              style: { fill: 'red' },
              autoRotate: true,
            }}
          />
        ) : null}
        <Slider />
      </Chart>
    </div>
  );
};

export default AreaPlot;
