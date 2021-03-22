import React, { useState, useEffect } from 'react';
import { Axis, Chart, Interaction, Point, Legend, Tooltip as ChartTooltip } from 'bizcharts';
import { history } from 'umi';
import { Space, DatePicker, Radio, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './index.less';

const ScatterPlot = ({ data }) => {
  const [plotData, setPlotData] = useState([]);
  const [year, setYear] = useState(2099);
  const [mode, setMode] = useState(1);
  useEffect(() => {
    if (data) {
      const tempData = [];
      data.forEach((d) => {
        if (d.results[0].values.length > year - 1945) {
          tempData.push({
            ...d,
            model_type: d.is_base ? 'base' : 'custom',
            value: Number(d.results[0].values[year - 1945].toFixed(6)),
          });
        }
      });
      setPlotData(tempData);
    }
  }, [data, year]);
  return (
    <div className={styles.scatterPlot}>
      <div className={styles.scatterPlotSelect}>
        <Space>
          <>
            Year:
            <DatePicker
              picker="year"
              style={{
                width: 80,
              }}
              value={moment([year])}
              onChange={(value) => setYear(new Date(value).getFullYear())}
              disabledDate={(current) =>
                current.isBefore(moment([1945]), 'year') || current.isAfter(moment([2500], 'year'))
              }
            />
          </>
          <>
            Mode:
            <Radio.Group
              defaultValue={mode}
              onChange={(e) => {
                setMode(e.target.value);
              }}
            >
              <Radio value={1}>
                Select mode{' '}
                <Tooltip title="Click the point to check model details.">
                  <InfoCircleOutlined />
                </Tooltip>
              </Radio>
              <Radio value={2}>
                Brush mode{' '}
                <Tooltip
                  title="Drag and release to brush to limit the scope.
                Double click to rollback"
                >
                  <InfoCircleOutlined />
                </Tooltip>
              </Radio>
            </Radio.Group>
          </>
        </Space>
      </div>
      <Chart
        padding={[30, 20, 50, 60]}
        height={480}
        autoFit
        placeholder={<div className={styles.noDateEntry}>No completed models</div>}
        data={plotData}
        scale={{
          n_wells: {
            alias: 'Number of wells detected',
            nice: true,
          },
          value: {
            alias: `50th percentile at year ${year}`,
            nice: true,
          },
          model_type: {
            alias: 'Model type',
            type: 'cat',
          },
        }}
        defaultInteractions={['tooltip', 'legend-filter', 'legend-highlight']}
        onPointClick={
          mode === 1
            ? ({ data: model }) => {
                history.push(`/model/view?id=${model.data.id}`);
              }
            : () => {}
        }
      >
        <Point
          position="n_wells*value"
          color={['model_type', ['#1890ff', '#52c41a']]}
          shape="circle"
          style={{
            fillOpacity: 0.6,
            strokeOpacity: 1,
          }}
          tooltip={[
            'name*n_wells*sim_end_year*water_content',
            (name, n_wells, sim_end_year, water_content) => {
              return {
                name,
                n_wells,
                sim_end_year,
                water_content: `${(water_content * 100).toFixed(0)}%`,
              };
            },
          ]}
        />
        <Axis name="value" title />
        <Axis name="n_wells" title />
        <Legend
          name="model_type"
          position="top-right"
          title={{
            fontSize: 12,
          }}
        />
        <ChartTooltip
          showMarkers
          title="name"
          itemTpl={
            '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '<span style="padding-bottom: 5px">Number of wells: {n_wells}</span><br/>' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '<span style="padding-bottom: 5px">End year: {sim_end_year}</span><br/>' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '<span style="padding-bottom: 5px">Water content: {water_content.toFixed(0)}</span><br/>' +
            '</li>'
          }
        />
        {mode === 2 ? (
          <Interaction
            type="brush"
            config={{
              showEnable: [
                { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
                { trigger: 'plot:mouseleave', action: 'cursor:default' },
              ],
              start: [
                {
                  trigger: 'plot:mousedown',
                  action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
                },
              ],
              processing: [
                {
                  trigger: 'plot:mousemove',
                  action: ['rect-mask:resize'],
                },
              ],
              end: [
                {
                  trigger: 'plot:mouseup',
                  action: ['brush:filter', 'brush:end', 'rect-mask:end', 'rect-mask:hide'],
                },
              ],
              rollback: [{ trigger: 'dblclick', action: ['brush:reset'] }],
            }}
          />
        ) : null}
      </Chart>
    </div>
  );
};
export default ScatterPlot;
