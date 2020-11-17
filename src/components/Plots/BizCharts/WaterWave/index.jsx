import React, { useRef, useEffect } from 'react';
import { Liquid } from '@antv/g2plot';

const WaterWave = ({ value }) => {
  const container = useRef();

  useEffect(() => {
    if (!container.current) {
      return;
    }
    const liquidPlot = new Liquid(container.current, {
      percent: value,
      height: 200,
    });
    liquidPlot.render();
  }, [container, value]);

  return <div ref={container} />;
};
export default WaterWave;
