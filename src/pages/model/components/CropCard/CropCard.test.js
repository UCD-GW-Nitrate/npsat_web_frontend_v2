/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CropCard, { formatter } from './index.jsx';

configure({ adapter: new Adapter() });

describe('Model Card unit test suits', () => {
  const wrapper = shallow(<CropCard />);
  it('#1 Crop card rendering', () => {
    expect(wrapper.find('Card').length).toBe(1);
  });
  it('#1.1 control components rendering', () => {
    expect(wrapper.find('Slider').length).toBe(1);
  })
});

describe('Model Card unit test suits with props', () => {
  const wrapper = shallow(<CropCard required />);
  it('#2 Crop card rendering', () => {
    expect(wrapper.find('Card').length).toBe(1);
  });
  it('#2.1 control components rendering', () => {
    expect(wrapper.find('Switch').length).toBe(0);
  })
  it('#2.2 control components rendering', () => {
    expect(wrapper.find('Slider').length).toBe(1);
  })
});

describe('Formatter test', () => {
  it('#1 formatter test num', () => {
    expect(formatter(100)).toBe('100%')
  })
  it('#1 formatter test num', () => {
    expect(formatter(0)).toBe('0%')
  })
  it('#1 formatter test num', () => {
    expect(formatter(156)).toBe('156%')
  })
})
