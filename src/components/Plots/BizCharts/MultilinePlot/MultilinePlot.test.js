/**
 * @jest-environment jsdom
 */

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import MultilinePlot from './index';

configure({ adapter: new Adapter() });

describe('MultilinePlot unit test suits', () => {
  const wrapper = shallow(<MultilinePlot percentiles={[]} data={[]} additionalInfo={{}} />);
  it('#1 MultilinePlot rendering', () => {
    expect(wrapper.find('div').length).toBe(3);
  });
  it('#1.1 control components rendering', () => {
    expect(wrapper.find('Button').length).toBe(4);
    expect(wrapper.find('Select').length).toBe(1);
  });
  it('#1.2 chart rendering', () => {
    expect(wrapper.find('ChartContainer').length).toBe(1);
    expect(wrapper.find('LineGeom').length).toBe(1);
    expect(wrapper.find('Axis').length).toBe(2);
    expect(wrapper.find('Legend').length).toBe(1);
    expect(wrapper.find('Slider').length).toBe(1);
  });
});
