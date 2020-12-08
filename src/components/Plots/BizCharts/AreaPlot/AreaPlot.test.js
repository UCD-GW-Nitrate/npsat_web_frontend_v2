/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AreaPlot from './index';

configure({ adapter: new Adapter() });

describe('Area plot unit test suits', () => {
  const wrapper = shallow(<AreaPlot percentiles={[]} data={[]}/>);
  it('#1 Area plot rendering', () => {
    expect(wrapper.find('div').length).toBe(3);
  });
  it('#1.1 control components rendering', () => {
    expect(wrapper.find('Select').length).toBe(2);
    expect(wrapper.find('Checkbox').length).toBe(1);
    expect(wrapper.find('Button').length).toBe(3);
  });
  it('#1.2 chart rendering', () => {
    expect(wrapper.find('ChartContainer').length).toBe(1);
    expect(wrapper.find('AreaGeom').length).toBe(1);
    expect(wrapper.find('LineGeom').length).toBe(1);
    expect(wrapper.find('Axis').length).toBe(2);
    expect(wrapper.find('Legend').length).toBe(1);
    expect(wrapper.find('Slider').length).toBe(1);
  });
});
