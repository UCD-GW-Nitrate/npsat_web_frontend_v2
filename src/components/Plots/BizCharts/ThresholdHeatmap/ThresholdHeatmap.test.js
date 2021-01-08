/**
 * @jest-environment jsdom
 */

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ThresholdHeatmap from './index';

configure({ adapter: new Adapter() });

describe('ThresholdHeatmap unit test suits', () => {
  const wrapper = shallow(<ThresholdHeatmap percentiles={[]} data={[]} additionalInfo={{}} />);
  it('#1 ThresholdHeatmap rendering', () => {
    expect(wrapper.find('div').length).toBe(2);
  });
  it('#1.1 control components rendering', () => {
    expect(wrapper.find('withConfigConsumer(Statistic)').length).toBe(2);
    expect(wrapper.find('Button').length).toBe(1);
  });
  it('#1.2 chart rendering', () => {
    expect(wrapper.find('ChartContainer').length).toBe(1);
    expect(wrapper.find('PathGeom').length).toBe(1);
    expect(wrapper.find('PolygonGeom').length).toBe(1);
    expect(wrapper.find('Axis').length).toBe(2);
    expect(wrapper.find('Legend').length).toBe(1);
  });
});
