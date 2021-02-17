/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from './index.jsx';

configure({ adapter: new Adapter() });

describe('Dashboard components RecentModelTable test', () => {
  const wrapper = shallow(<Table />);
  it('#1 Wrapper Card rendering', () => {
    expect(wrapper.find('Card').length).toBe(1);
  });
  it('#2 table language rendering by context provider', () => {
    expect(wrapper.find('ContextProvider').length).toBe(1);
  });
});
