/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BoxPlot from './index';

configure({ adapter: new Adapter() });

describe('Box plot unit test suits', () => {
  const wrapper = shallow(<BoxPlot percentiles={[]} data={[]} />);
  it('#1 Box plot rendering', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('#1.2 chart rendering', () => {
    expect(wrapper.find('ChartContainer').length).toBe(1);
    expect(wrapper.find('SchemaGeom').length).toBe(1);
    expect(wrapper.find('Axis').length).toBe(2);
    expect(wrapper.find('Slider').length).toBe(1);
  });
});
