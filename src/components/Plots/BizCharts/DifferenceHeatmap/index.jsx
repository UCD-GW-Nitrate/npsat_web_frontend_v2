import React, { useState, useEffect, useContext } from 'react';
import { HeatmapChart } from 'bizcharts';
import { Statistic, Col, Row, InputNumber, Form, Button, Tooltip, Space } from 'antd';
import { RouteContext } from '@ant-design/pro-layout';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

const DifferenceHeatmap = ({ baseData, customData, percentiles, additionalInfo }) => {
  const { isMobile } = useContext(RouteContext);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState(undefined);
  const [plotData, setPlotData] = useState({});
  const [range, setRange] = useState(200);
  const aggregate = (data, level) => {
    const result = [];
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
          agg.value = Number((agg.value / (level - i)).toFixed(0));
        } else {
          agg.year_range = `${1945 + i} - ${1945 + i + level}`;
          agg.value = Number((agg.value / level).toFixed(0));
        }
        result.push(agg);
      }
    });
    return result;
  };
  useEffect(() => {
    if (baseData && percentiles) {
      const sample = baseData[percentiles[0]];
      if (sample) {
        setRange(sample.length);
        setSelected(Math.ceil(sample.length / 10));
        form.setFieldsValue({ years: sample.length / 10 });
      }
    }
  }, [baseData, percentiles]);
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
  return (
    <div className={styles.heatmapPlot}>
      <div className={styles.heatmapPlotSelect}>
        <Form onFinish={({ years }) => setSelected(years)} hideRequiredMark form={form}>
          <Row gutter={24}>
            <Col span={8}>
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
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item style={{ float: 'right' }}>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <HeatmapChart
        height={500}
        forceFit
        yField="percentile"
        xField="year_range"
        sizeField="value"
        colorField="value"
        meta={{
          value: {
            alias: 'Average difference of Nitrogen',
          },
        }}
        tooltip={{
          visible: true,
          formatter: (years, percentile, value) => ({
            name: 'Average difference of Nitrogen',
            value: `${value} at ${percentile}`,
          }),
        }}
        xAxis={{
          label: {
            visible: true,
            autoHide: false,
          },
        }}
        yAxis={{
          visible: !isMobile,
        }}
        legend={{
          visible: !isMobile,
        }}
        data={aggregate(plotData, selected)}
      />
    </div>
  );
};
export default DifferenceHeatmap;
