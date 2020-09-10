/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModelDetail from './index.jsx';

configure({ adapter: new Adapter() });

describe('Model detail page unit test suits', () => {
  const wrapper = shallow(<ModelDetail info={{}} />);
  it('#1 detail card rendering', () => {
    expect(wrapper.find('Card').length).toBe(4);
  });
  it('#1.1 meta info rendering', () => {
    expect(wrapper.find('Descriptions').length).toBe(1);
  })
  it('#1.2 table rendering', () => {
    expect(wrapper.find('TableWrapper').length).toBe(1);
  })
});
