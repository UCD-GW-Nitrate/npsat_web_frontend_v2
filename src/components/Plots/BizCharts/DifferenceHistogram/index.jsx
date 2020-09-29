import React, { useState, useEffect } from 'react';
import { Chart, Tooltip, Interval, Legend, Slider, Axis, Annotation } from 'bizcharts';
import { Select } from 'antd';
import { ordinalSuffix } from '@/utils/utils';
import styles from './index.less';

const DifferenceHistogram = ({ baseData, customData, percentiles, reductionYear }) => {
  const [selected, setSelected] = useState([]);
  const [plotData, setPlotData] = useState({});
  useEffect(() => {
    if (baseData && customData) {
      const data = {};
      percentiles.forEach(p => {
        const difference = [];
        const baseResult = baseData[p];
        const customResult = customData[p];
        const years = Math.min(baseResult.length, customResult.length);
        for (let i = 0; i < years; i += 1) {
          difference.push({
            ...baseResult[i],
            value: Number((baseResult[i].value - customResult[i].value).toFixed(6))
          })
        }
        data[p] = difference;
      });
      setPlotData(data);
    }
  }, [baseData, customData]);
  return (
    <>
      <Select
        style={{ width: '100%' }}
        mode="multiple"
        onChange={setSelected}
        value={selected}
      >
        {percentiles.map((percentile) => (
          <Select.Option value={percentile} key={percentile}>
            {`${ordinalSuffix(percentile)} percentile`}
          </Select.Option>
        ))}
      </Select>
      <Chart
        padding={[10, 20, 50, 60]}
        height={500}
        data={Object.keys(plotData).length === 0 ? [] : selected.map((index) => plotData[index]).flat(1)}
        autoFit
        scale={{
          value: { min: 0, alias: 'Amount of Nitrogen', nice: true },
          year: { tickCount: 10, type: 'cat' },
        }}
        placeholder={<div className={styles.noDateEntry}>Select from above percentile list</div>}
        defaultInteractions={['tooltip', 'element-highlight-by-x', 'legend-highlight']}
      >
        <Interval
          adjust={[
            {
              type: 'dodge',
              marginRatio: 0,
              dodgeBy: 'percentile'
            },
          ]}
          color="percentile"
          position="year*value"
        />
        <Tooltip shared />
        <Legend position="top" />
        <Slider />
        <Tooltip showCrosshairs shared />
        <Axis name="value" title />
        <Axis name="year" />
        {reductionYear ? (
          <Annotation.Line
            start={[reductionYear, 'min']}
            end={[reductionYear, 'max']}
            text={{
              position: '90%',
              content: 'reduction year',
              style: { fill: 'red' },
              autoRotate: false,
            }}
          />
        ) : null}
      </Chart>
    </>
  );
};
export default DifferenceHistogram;
