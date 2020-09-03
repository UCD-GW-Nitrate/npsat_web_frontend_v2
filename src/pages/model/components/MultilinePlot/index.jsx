import { Chart, Line } from 'bizcharts';
import { Select } from 'antd';
import React, { useState } from 'react';
import { ordinalSuffix } from '@/utils/utils';
import styles from './index.less';

// usage: pass plot data, percentile list, and reduction year
const MultilinePlot = ({ percentiles, data }) => {
  const [ shownLines, setLines ] = useState()
  return (
    <div className={styles.linePlot}>
      <div >
        {/*<span>*/}
        {/*  Percentiles to include*/}
        {/*</span>*/}
        {/*<Select*/}
        {/*  mode="multiple"*/}
        {/*>*/}
        {/*  {percentiles.map(percentile =>*/}
        {/*    <Select.Option value={percentile} key={percentile}>*/}
        {/*      {`${ordinalSuffix(percentile)} percentile`}*/}
        {/*    </Select.Option>*/}
        {/*  )}*/}
        {/*</Select>*/}
      </div>
      <Chart
        padding={[10, 20, 50, 40]}
        autoFit
        height={300}
        data={data[50]}
        scale={{ value: { min: 0 } }}
      >
        <Line position="year*value"/>
      </Chart>
    </div>
  );
};

export default MultilinePlot;
