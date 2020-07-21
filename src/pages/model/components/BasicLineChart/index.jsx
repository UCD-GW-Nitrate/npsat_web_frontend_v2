import { Chart, Tooltip, Axis, Line, Point } from 'viser-react';
import React from 'react';

const BasicLineChart = props => {
  const { data, scale, config } = props;
  return (
    <Chart forceFit height={400} data={data} scale={scale}>
      <Tooltip />
      <Axis />
      <Line position={config} />
      <Point position={config} shape="circle"/>
    </Chart>
  );
}

export default BasicLineChart;
