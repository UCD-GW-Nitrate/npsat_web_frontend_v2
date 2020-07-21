import { Chart, Tooltip, Axis, Legend, Line, Point } from 'viser-react';
import React from 'react';

const PercentileLineChart = props => {
  const { data, scale, config } = props;
  return (
    <Chart forceFit height={400} data={data} scale={scale}>
      <Tooltip />
      <Axis />
      <Legend />
      <Line position={config.axis} color={config.type} />
      <Point position={config.axis} color={config.type} size={4} style={{ stroke: '#fff', lineWidth: 1 }} shape="circle"/>
    </Chart>
  );
}

export default PercentileLineChart;
