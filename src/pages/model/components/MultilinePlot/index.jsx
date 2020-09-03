import { Chart, Line, Tooltip, Annotation, Slider } from 'bizcharts';
import { Select } from 'antd';
import React, { useState } from 'react';
import { ordinalSuffix } from '@/utils/utils';
import styles from './index.less';

// usage: pass plot data, percentile list, and reduction year
const MultilinePlot = ({ percentiles, data, reductionYear }) => {
  const [ shownLines, setLines ] = useState([])
  console.log(data)
  return (
    <div className={styles.linePlot}>
      <div className={styles.linePlotSelect}>
        <Select
          mode="multiple"
          placeholder="Select percentile(s) to shown in the plot"
          style={{ width: '100%' }}
          onChange={value => setLines([...value])}
        >
          {percentiles.map(percentile =>
            <Select.Option value={percentile} key={percentile}>
              {`${ordinalSuffix(percentile)} percentile`}
            </Select.Option>
          )}
        </Select>
      </div>
      <Chart
        padding={[10, 20, 50, 60]}
        autoFit
        height={500}
        data={Object.keys(data).length === 0 ? [] : shownLines.map(index => data[index]).flat(1)}
        scale={{ value: { min: 0 }, nice: true }}
        placeholder={<div className={styles.noDateEntry}>Select from above percentile list</div>}
        defaultInteractions={['tooltip', 'element-highlight', 'legend-highlight']}

      >
        <Slider />
        <Line position="year*value" color="percentile"/>
        <Tooltip showCrosshairs shared />
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

export default MultilinePlot;
