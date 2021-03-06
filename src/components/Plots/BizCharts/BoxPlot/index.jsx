import { Chart, Tooltip, Annotation, Axis, Slider, Schema } from 'bizcharts';
import React, { useEffect, useState } from 'react';
import 'antd/es/style/themes/default.less';
import { isObjectEmpty } from '@/utils/utils';
import styles from './index.less';

// usage: pass plot data, percentile list, and additional info
const BoxPlot = ({ percentiles, data, additionalInfo }) => {
  const [range, setPlot] = useState([]);
  useEffect(() => {
    if (!isObjectEmpty(data)) {
      const plotData = [];
      const year = data[percentiles[0]].length;
      for (let i = 0; i < year; i += 1) {
        const q1 = Number(data[25][i].value.toFixed(6));
        const median = Number(data[50][i].value.toFixed(6));
        const q3 = Number(data[75][i].value.toFixed(6));
        const iqr = q3 - q1;
        const low = Math.max(Number((q1 - 1.5 * iqr).toFixed(6)), data[1][i].value);
        const high = Math.min(Number((q3 + 1.5 * iqr).toFixed(6)), data[99][i].value);
        plotData.push({
          range: [low, q1, median, q3, high],
          year: data[25][i].year,
          low,
          q1,
          q3,
          high,
          median,
        });
      }
      setPlot(plotData);
    } else {
      setPlot([]);
    }
  }, [data]);
  return (
    <div className={styles.boxPlot}>
      <Chart
        padding={[10, 20, 50, 60]}
        autoFit
        height={500}
        data={range}
        scale={{
          range: { alias: 'Concentration of Nitrate as N [mg/L]', nice: true },
          year: { tickCount: 10, sync: true },
        }}
        defaultInteractions={['tooltip']}
      >
        <Schema
          position="year*range"
          shape="box"
          style={{
            stroke: '#545454',
            fill: '#1890FF',
            fillOpacity: 0.3,
          }}
          tooltip={[
            'year*low*q1*median*q3*high',
            (year, low, q1, median, q3, high) => {
              return {
                low,
                q1,
                median,
                q3,
                high,
              };
            },
          ]}
        />
        <Tooltip
          itemTpl={
            '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '<span style="padding-bottom: 5px">high: {high}</span><br/>' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '<span style="padding-bottom: 5px">q3: {q3}</span><br/>' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '<span style="padding-bottom: 5px">median: {median}</span><br/>' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '<span style="padding-bottom: 5px">q1: {q1}</span><br/>' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '<span>low: {low}</span><br/>' +
            '</li>'
          }
        />
        <Axis name="year" />
        <Axis name="range" title />
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
        <Slider />
      </Chart>
    </div>
  );
};

export default BoxPlot;
