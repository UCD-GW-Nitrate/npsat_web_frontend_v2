import React, { useState, useEffect } from 'react';
import { Chart, Tooltip, Legend, Slider, Axis, Annotation, Line } from 'bizcharts';
import { Select } from 'antd';
import { ordinalSuffix } from '@/utils/utils';
import styles from './index.less';

const GroupComparisonLinePlot = ({ results, percentiles, models }) => {
  const [selected, setSelected] = useState(undefined);
  const [plotData, setPlotData] = useState({});
  useEffect(() => {
    if (models) {
      const data = {};
      console.log(results, percentiles, models);
      setPlotData(data);
    }
  }, [models]);
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
        data={Object.keys(plotData).length === 0 && selected ? [] : plotData[selected]}
        autoFit
        scale={{
          value: { alias: 'Amount of Nitrogen', nice: true },
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
      </Chart>
    </div>
  );
};
export default GroupComparisonLinePlot;
