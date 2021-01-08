/**
 * @jest-environment jsdom
 */

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ScatterPlot from './index';

configure({ adapter: new Adapter() });

describe('ScatterPlot unit test suits', () => {
  const wrapper = shallow(<ScatterPlot percentiles={[]} data={[]} additionalInfo={{}} />);
  it('#1 ScatterPlot rendering', () => {
    expect(wrapper.find('div').length).toBe(2);
  });
  it('#1.1 control components rendering', () => {
    expect(wrapper.find('Radio').length).toBe(2);
    expect(wrapper.find('Picker').length).toBe(1);
  });
  it('#1.2 chart rendering', () => {
    expect(wrapper.find('ChartContainer').length).toBe(1);
    expect(wrapper.find('PointGeom').length).toBe(1);
    expect(wrapper.find('Axis').length).toBe(2);
    expect(wrapper.find('Legend').length).toBe(1);
  });
});
