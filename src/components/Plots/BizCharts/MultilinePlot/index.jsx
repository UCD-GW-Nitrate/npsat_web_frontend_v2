import { Chart, Line, Tooltip, Annotation, Slider, Legend, Axis } from 'bizcharts';
import { Button, Select, Divider } from 'antd';
import React, { useState } from 'react';
import { ordinalSuffix } from '@/utils/utils';
import styles from './index.less';

// usage: pass plot data, percentile list, and reduction year
const MultilinePlot = ({ percentiles, data, reductionYear }) => {
  const [shownLines, setLines] = useState([]);
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
        data={Object.keys(data).length === 0 ? [] : shownLines.map((index) => data[index]).flat(1)}
        scale={{
          value: { min: 0, alias: 'Amount of Nitrogen', nice: true },
          year: { tickCount: 10 },
        }}
        placeholder={<div className={styles.noDateEntry}>Select from above percentile list</div>}
        defaultInteractions={['tooltip', 'element-highlight', 'legend-highlight']}
        pure
      >
        <Legend position="top" />
        <Slider />
        <Line position="year*value" color="percentile" />
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
    </div>
  );
};

export default MultilinePlot;
