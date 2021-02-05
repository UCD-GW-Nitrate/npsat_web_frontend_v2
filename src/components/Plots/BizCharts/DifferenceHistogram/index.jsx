import React, { useState, useEffect } from 'react';
import { Chart, Tooltip, Interval, Legend, Slider, Axis, Annotation } from 'bizcharts';
import { Select, notification } from 'antd';
import { isObjectEmpty, ordinalSuffix } from '@/utils/utils';
import styles from './index.less';

const DifferenceHistogram = ({ baseData, customData, percentiles, additionalInfo }) => {
  const [selected, setSelected] = useState([]);
  const [plotData, setPlotData] = useState({});
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
    <div className={styles.barPlot}>
      <div className={styles.barPlotSelect}>
        <Select
          style={{ width: '100%' }}
          mode="multiple"
          showArrow
          placeholder="Select percentile(s)"
          onChange={(value) => {
            if (value.length > 5) {
              notification.warning({
                description:
                  'It is not recommended to select too much percentiles at the same time.' +
                  'It could be slow to load and slide and some bars are too small to be displayed.',
                message: 'Selection exceeds 5 percentiles',
                key: 'max-warning',
              });
            }
            setSelected([...value]);
          }}
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
        data={
          isObjectEmpty(plotData) ? [] : selected.map((index) => plotData[index]).flat(1)
        }
        autoFit
        scale={{
          value: { alias: 'Concentration of Nitrate as N [mg/L]', nice: true },
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
              dodgeBy: 'percentile',
            },
          ]}
          color="percentile"
          shape="hollowRect"
          position="year*value"
        />
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
export default DifferenceHistogram;
