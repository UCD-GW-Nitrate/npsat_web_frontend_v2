import React, { useState, useEffect, useContext } from 'react';
import { Axis, Chart, Path, Interaction, Legend, Polygon } from 'bizcharts';
import { Statistic, Col, Row, InputNumber, Form, Button, Tooltip, Space } from 'antd';
import { RouteContext } from '@ant-design/pro-layout';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ordinalSuffix } from '@/utils/utils';
import styles from './index.less';

const DifferenceHeatmap = ({ baseData, customData, percentiles, additionalInfo }) => {
  const { isMobile } = useContext(RouteContext);
  const [form] = Form.useForm();
  const [plotData, setPlotData] = useState({});
  const [range, setRange] = useState(200);
  const [processedData, setProcessedData] = useState([]);
  const [processedInterval, setProcessedInterval] = useState([]);
  const aggregate = (data, level, threshold) => {
    const result = [];
    const interval = new Set();
    const differenceByYear = new Map();
    if (!level || !data) {
      return result;
    }
    percentiles.forEach((p) => {
      const singleDifference = data[p];
      if (!singleDifference) {
        return;
      }
      const len = singleDifference.length;
      for (let i = 0; i < len; i += level) {
        // assume divisible
        const temp = singleDifference.slice(i, Math.min(i + level, len));
        const agg = temp.reduce(
          (acc, cur) => ({ ...acc, ...cur, value: Number((acc.value + cur.value).toFixed(6)) }),
          { value: 0 },
        );
        if (i + level > len) {
          agg.year_range = `${1945 + i} - ${1945 + len}`;
          agg.value = Number((agg.value / (level - i)).toFixed(6));
        } else {
          agg.year_range = `${1945 + i} - ${1945 + i + level}`;
          agg.value = Number((agg.value / level).toFixed(6));
        }
        interval.add(agg.year_range);
        result.push(agg);
        if (!differenceByYear.has(agg.year_range) && agg.value >= threshold) {
          differenceByYear.set(agg.year_range, {
            year_range: agg.year_range,
            threshold: agg.percentile,
          });
        }
      }
    });
    const path = [...differenceByYear.values()];
    path.sort((a, b) => a.year_range.localeCompare(b.year_range));
    result.push(...path);
    return { result, interval: [...interval] };
  };
  useEffect(() => {
    if (baseData && customData) {
      const data = {};
      percentiles.forEach((p) => {
        const difference = [];
        const baseResult = baseData[p];
        const customResult = customData[p];
        const years = Math.min(baseResult.length, customResult.length);
        for (let i = 0; i < years; i += 1) {
          difference.push({
            ...baseResult[i],
            value: Number((baseResult[i].value - customResult[i].value).toFixed(6)),
          });
        }
        data[p] = difference;
      });
      setPlotData(data);
    }
  }, [baseData, customData]);
  const onSubmit = ({ years, threshold }) => {
    const { result, interval } = aggregate(plotData, years, threshold);
    setProcessedData(result);
    setProcessedInterval(interval);
  };
  useEffect(() => {
    if (baseData && percentiles) {
      const sample = baseData[percentiles[0]];
      if (sample) {
        setRange(sample.length);
        // form.setFieldsValue({ years: sample.length / 10, threshold: 10 });
      }
    }
  }, [baseData, percentiles]);
  return (
    <div className={styles.heatmapPlot}>
      <div className={styles.heatmapPlotSelect}>
        <Form onFinish={onSubmit} hideRequiredMark form={form}>
          <Row gutter={24}>
            <Col span={9}>
              <Space>
                <Statistic
                  title="Implementation start year"
                  value={additionalInfo.reduction_start_year}
                  formatter={(value) => `${value}`}
                />
                <Statistic
                  title="Implementation end year"
                  value={additionalInfo.reduction_end_year}
                  formatter={(value) => `${value}`}
                />
              </Space>
            </Col>
            <Col span={6}>
              <Form.Item
                required
                rules={[
                  {
                    validator: (_, value) => {
                      if (isMobile) {
                        if (value <= range && value >= Math.ceil(range / 4)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            `Out of range. Select from ${Math.ceil(range / 4)} to ${range}`,
                          );
                        }
                      } else {
                        if (value <= range && value >= Math.ceil(range / 40)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            `Out of range. Select from ${Math.ceil(range / 40)} to ${range}`,
                          );
                        }
                      }
                    },
                  },
                ]}
                label={
                  <span>
                    Aggregate(avg) years{' '}
                    <Tooltip title="Options will be limited if viewed in mobile devices">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="years"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  max={range}
                  min={isMobile ? Math.ceil(range / 4) : Math.ceil(range / 40)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={
                  <span>
                    Threshold{' '}
                    <Tooltip title="A path that indicates the threshold entered">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </span>
                }
                required
                name="threshold"
              >
                <InputNumber style={{ width: '100%' }} step={0.01} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item style={{ float: 'right' }}>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Chart
        padding={isMobile ? [20, 10, 65, 10] : [20, 40, 65, 100]}
        height={500}
        data={processedData}
        autoFit
        placeholder={<div className={styles.noDateEntry}>Select from above percentile list</div>}
        scale={{
          threshold: {
            type: 'cat',
            values: percentiles.map((p) => `${ordinalSuffix(p)} percentile`),
          },
          percentile: {
            type: 'cat',
            values: percentiles.map((p) => `${ordinalSuffix(p)} percentile`),
          },
          year_range: {
            type: 'cat',
            values: processedInterval,
            ticks: processedInterval,
          },
          value: {
            alias: 'Concentration of Nitrate as N [mg/L]'
          }
        }}
      >
        <Polygon
          position="year_range*percentile"
          color={['value', '#BAE7FF-#1890FF-#0050B3']}
          size="value"
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
          tooltip="year_range*percentile*value"
        />
        <Legend name="value" slidable={false} position="top" />
        <Path shape="line" color="#faad14" position="year_range*threshold" tooltip />
        <Axis name="threshold" visible={false} />
        <Axis name="percentile" position="left" visible={!isMobile} />
        <Interaction type="element-active" />
      </Chart>
    </div>
  );
};
export default DifferenceHeatmap;
