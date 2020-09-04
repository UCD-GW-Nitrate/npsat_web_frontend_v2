import { Chart, Tooltip, Annotation, Slider, Legend, Axis, Area } from 'bizcharts';
import { Button, Select, Divider } from 'antd';
import React, { useState } from 'react';
import { ordinalSuffix } from '@/utils/utils';
import styles from './index.less';

// usage: pass plot data, percentile list, and reduction year
const AreaPlot = ({ percentiles, data, reductionYear }) => {
  const [ upperBound, setUpper ] = useState(75);
  const [ lowerBound, setLower ] = useState(25);
  return (
    <div className={styles.linePlot}>
      <div className={styles.linePlotSelect}>
        <Select
          placeholder="Select percentile upper bound"
          style={{ width: '30%' }}
          onChange={setUpper}
          value={upperBound}
        >
          {percentiles.map(percentile =>
            <Select.Option value={percentile} key={percentile}>
              {`${ordinalSuffix(percentile)} percentile`}
            </Select.Option>
          )}
        </Select>
        <Select
          placeholder="Select percentile lower bound"
          style={{ width: '30%' }}
          onChange={setLower}
          value={lowerBound}
        >
          {percentiles.map(percentile =>
            <Select.Option value={percentile} key={percentile}>
              {`${ordinalSuffix(percentile)} percentile`}
            </Select.Option>
          )}
        </Select>
        <Divider />
      </div>
      <Chart
        padding={[10, 20, 50, 60]}
        autoFit
        height={500}
        data={Object.keys(data).length === 0 || upperBound === 0 || lowerBound === 0 ? [] :
          data[upperBound].map((d, index) => ({ year: d.year, value: [data[lowerBound][index].value, d.value]}))
        }
        scale={{ value: { min: 0, alias: 'Amount of Nitrogen' }, nice: true, year: { tickCount: 10 }}}
        placeholder={<div className={styles.noDateEntry}>Select from above percentile list</div>}
        defaultInteractions={['tooltip', 'element-highlight', 'legend-highlight']}
        pure
      >
        <Legend position="top" />
        <Slider />
        <Area position="year*value" color="percentile" style={ {fill: "blue"} }/>
        <Tooltip showCrosshairs shared />
        <Axis name="value" title/>
        <Axis name="year" />
        { reductionYear ?
          <Annotation.Line
            start={[reductionYear, 'min']}
            end={[reductionYear, 'max']}
            text={{ position: '90%', content: 'reduction year', style: { fill: 'red' }, autoRotate: false}}/>
          :
          null
        }
      </Chart>
    </div>
  );
};

export default AreaPlot;
