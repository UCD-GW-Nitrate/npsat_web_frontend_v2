import React, { useState, useEffect } from 'react';
import { Chart, Tooltip, Legend, Slider, Axis, Annotation, Line } from 'bizcharts';
import { Select } from 'antd';
import { ordinalSuffix, isObjectEmpty } from '@/utils/utils';
import styles from './index.less';

const ComparisonLinePlot = ({ baseData, customData, percentiles, additionalInfo }) => {
  const [selected, setSelected] = useState(undefined);
  const [plotData, setPlotData] = useState({});
  useEffect(() => {
    if (baseData && customData) {
      const data = {};
      percentiles.forEach((p) => {
        const baseResult = baseData[p];
        const customResult = customData[p];
        const years = Math.min(baseResult.length, customResult.length);
        for (let i = 0; i < years; i += 1) {
          baseResult[i].model = 'base';
          customResult[i].model = 'custom';
        }
        data[p] = [...baseResult.slice(0, years), ...customResult.slice(0, years)];
      });
      setPlotData(data);
    }
  }, [baseData, customData]);
  return (
    <div className={styles.comparisonLinePlot}>
      <div className={styles.comparisonLineSelect}>
        <Select
          style={{ width: '100%' }}
          placeholder="Select percentile"
          onChange={setSelected}
          value={selected}
        >
          {percentiles.map((percentile) => (
            <Select.Option value={percentile} key={percentile}>
              {`${ordinalSuffix(percentile)} percentile`}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Chart
        padding={[10, 20, 50, 80]}
        height={500}
        data={isObjectEmpty(plotData) && selected ? [] : plotData[selected]}
        autoFit
        scale={{
          value: { alias: 'Concentration of Nitrate as N [mg/L]', nice: true },
          year: { tickCount: 10 },
        }}
        placeholder={<div className={styles.noDateEntry}>Select from above percentile list</div>}
        defaultInteractions={['tooltip', 'element-highlight-by-x', 'legend-highlight']}
      >
        <Line position="year*value" color="model" />
        <Tooltip shared />
        <Legend position="top" />
        <Slider />
        <Tooltip showCrosshairs shared />
        <Axis name="value" title />
        <Axis name="year" />
        {additionalInfo && additionalInfo.reduction_start_year ? (
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
        {additionalInfo && additionalInfo.reduction_end_year ? (
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
      </Chart>
    </div>
  );
};
export default ComparisonLinePlot;
