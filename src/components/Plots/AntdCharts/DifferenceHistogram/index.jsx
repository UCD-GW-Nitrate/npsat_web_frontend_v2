import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import { Select } from 'antd';
import { ordinalSuffix } from '@/utils/utils';

const DifferenceHistogram = ({ baseData, customData, percentiles }) => {
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
        for (let i = 0; i < years; i++) {
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
    <>
      <Select style={{ width: '100%' }} mode="multiple" onChange={setSelected} value={selected}>
        {percentiles.map((percentile) => (
          <Select.Option value={percentile} key={percentile}>
            {`${ordinalSuffix(percentile)} percentile`}
          </Select.Option>
        ))}
      </Select>
      <Column
        height={400}
        yField="value"
        xField="year"
        meta={{
          value: {
            alias: 'Amount of Nitrogen',
          },
        }}
        interactions={[
          {
            type: 'scrollbar',
          },
        ]}
        data={
          Object.keys(plotData).length === 0 ? [] : selected.map((index) => plotData[index]).flat(1)
        }
      />
    </>
  );
};
export default DifferenceHistogram;
