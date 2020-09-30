import React, { useState, useEffect, useContext } from 'react';
import { HeatmapChart } from 'bizcharts';
import { Select, Col, Row, InputNumber } from 'antd';
import { ordinalSuffix } from '@/utils/utils';
import { RouteContext } from '@ant-design/pro-layout';
import styles from './index.less';

// TODO: responsive | Input | Prompt
const DifferenceHeatmap = ({ baseData, customData, percentiles, reductionYear }) => {
  const { isMobile } = useContext(RouteContext);
  const [selected, setSelected] = useState(20);
  const [plotData, setPlotData] = useState({});
  const [range, setRange] = useState(200);
  const aggregate = (data, level) => {
    const result = [];
    percentiles.forEach((p) => {
      const singleDifference = data[p];
      if (!singleDifference) {
        return ;
      }
      const len = singleDifference.length;
      for (let i = 0; i < len; i += level) {
        // assume divisible
        const temp = singleDifference.slice(i, Math.min(i + level, len));
        const agg = temp.reduce(
          (acc, cur) => ({ ...acc, ...cur, value:
              Number((acc.value + cur.value).toFixed(6)) }), { value: 0 }
          );
        if (i + 10 > len) {
          agg.year_range = `${1945 + i} ~ ${1945 + len}`;
        } else {
          agg.year_range = `${1945 + i} ~ ${1945 + i + level}`;
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
        <InputNumber
          value={selected}
          onPressEnter={setSelected}
          max={isMobile ? range : Math.ceil(range / 3)}
          min={isMobile ? Math.ceil(range / 4) : Math.ceil(range / 40)}
        />
      </div>
      <HeatmapChart
        height={500}
        forceFit
        yField="percentile"
        xField="year_range"
        sizeField="value"
        colorField='value'
        meta={{
          value: {
            alias: 'Difference of Nitrogen'
          }
        }}
        tooltip={{
          visible: true,
          formatter: (years, percentile, value) => ({
            name: 'Difference of Nitrogen',
            value: `${value} at ${percentile}`
          })
        }}
        xAxis={{
          label: {
            visible: true,
            autoHide: false
          }
        }}
        yAxis={{
          visible: !isMobile
        }}
        legend={{
          visible: !isMobile
        }}
        data={aggregate(plotData, selected)}
      />
    </div>
  );
};
export default DifferenceHeatmap;
