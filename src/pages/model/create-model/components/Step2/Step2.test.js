/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Step2 from './index.jsx';

configure({ adapter: new Adapter() });

describe('Create Model Step2(2) unit shallow test suits', () => {
  const wrapper = shallow(<Step2.WrappedComponent data={{}} />);
  it('#1 Step2(2) Tab rendering', () => {
    expect(wrapper.find('Tabs').length).toBe(1);
  });
  it('#2 Step2(2) SubTabs rendering', () => {
    expect(wrapper.find('TabPane').length).toBe(6);
  });
  it('#2 Step2(2) Divider rendering', () => {
    expect(wrapper.find('Divider').length).toBe(1);
  });
});
