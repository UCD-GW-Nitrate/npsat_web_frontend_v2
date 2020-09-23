/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Step1 from './index.jsx';

configure({ adapter: new Adapter() });

describe('Create Model Step1 unit shallow test suits', () => {
  const wrapper = shallow(<Step1.WrappedComponent user={{ currentUser: {} }} />);
  it('#1 Step1 Tab rendering', () => {
    expect(wrapper.find('Tabs').length).toBe(1);
  });
  it('#2 Step1 SubTabs rendering', () => {
    expect(wrapper.find('TabPane').length).toBe(5);
  });
  it('#2 Step1 Divider rendering', () => {
    expect(wrapper.find('Divider').length).toBe(1);
  });
});
