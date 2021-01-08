/**
 * @jest-environment jsdom
 */

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import DifferenceHeatmap from './index';

configure({ adapter: new Adapter() });

describe('DifferenceHeatmap unit test suits', () => {
  const wrapper = shallow(<DifferenceHeatmap percentiles={[]} data={[]} additionalInfo={{}} />);
  it('#1 DifferenceHeatmap rendering', () => {
    expect(wrapper.find('div').length).toBe(2);
  });
  it('#1.1 control components rendering', () => {
    expect(wrapper.find('withConfigConsumer(Statistic)').length).toBe(2);
    expect(wrapper.find('Button').length).toBe(1);
  });
  it('#1.2 chart rendering', () => {
    expect(wrapper.find('HeatmapChart').length).toBe(1);
  });
});
