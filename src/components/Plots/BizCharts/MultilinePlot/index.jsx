import { Chart, Line, Tooltip, Annotation, Slider, Legend, Axis } from 'bizcharts';
import { Button, Select, Divider } from 'antd';
import React, { useState } from 'react';
import { ordinalSuffix, isObjectEmpty } from '@/utils/utils';
import styles from './index.less';

// usage: pass plot data, percentile list, and additional info
const MultilinePlot = ({ percentiles, data, additionalInfo }) => {
  const [shownLines, setLines] = useState([5, 50, 95]);
  return (
    <div className={styles.linePlot}>
      <div className={styles.linePlotSelect}>
        <Select
          mode="multiple"
          placeholder="Select percentile(s) to show in the plot"
          style={{ width: '100%' }}
          onChange={(value) => setLines([...value])}
          value={shownLines}
          showArrow
        >
          {percentiles.map((percentile) => (
            <Select.Option value={percentile} key={percentile}>
              {`${ordinalSuffix(percentile)} percentile`}
            </Select.Option>
          ))}
        </Select>
        <div className={styles.utilityButtons}>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            onClick={() => setLines([5, 50, 95])}
          >
            Select 5th, 50th, 95th
          </Button>
          <Button onClick={() => setLines([10, 50, 90])}>Select 10th, 50th, 90th</Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            onClick={() => setLines([...percentiles])}
          >
            Select all
          </Button>
          <Button onClick={() => setLines([])}>Clear</Button>
        </div>
        <Divider />
      </div>
      <Chart
        padding={[10, 20, 50, 60]}
        autoFit
        height={500}
        data={isObjectEmpty(data) ? [] : shownLines.map((index) => data[index]).flat(1)}
        scale={{
          value: { min: 0, alias: 'Concentration of Nitrate as N [mg/L]', nice: true },
          year: { tickCount: 10 },
        }}
        placeholder={<div className={styles.noDateEntry}>Select from above percentile list</div>}
        defaultInteractions={['tooltip', 'element-highlight', 'legend-highlight']}
      >
        <Legend position="top" />
        <Slider />
        <Line position="year*value" color="percentile" />
        <Tooltip showCrosshairs shared />
        <Axis name="value" title />
        <Axis name="year" />
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
      </Chart>
    </div>
  );
};

export default MultilinePlot;
