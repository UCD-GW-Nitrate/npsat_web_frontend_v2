/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ComparisonLinePlot from './index';

configure({ adapter: new Adapter() });

describe('ComparisonLinePlot unit test suits', () => {
  const wrapper = shallow(<ComparisonLinePlot percentiles={[]} data={[]}/>);
  it('#1 ComparisonLinePlot rendering', () => {
    expect(wrapper.find('div').length).toBe(2);
  });
  it('#1.1 control components rendering', () => {
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
