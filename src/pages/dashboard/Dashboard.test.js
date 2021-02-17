/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from './index.jsx';

configure({ adapter: new Adapter() });

describe('Dashboard components RecentModelTable test', () => {
  const wrapper = shallow(
    <Dashboard.WrappedComponent user={{ currentUser: { token: '123456' } }} />,
  );
  it('#1 Wrapper UI skeleton ', () => {
    expect(wrapper.find('GridContent').length).toBe(1);
  });
  it('#2 First row components card rendering', () => {
    expect(wrapper.find('Card').length).toBe(2);
  });
  it('#3 Second row components tables rendering', () => {
    expect(wrapper.find('RecentModelTable').length).toBe(2);
  });
});
