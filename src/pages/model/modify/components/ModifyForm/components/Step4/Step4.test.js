/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Step4 from './index.jsx';

configure({ adapter: new Adapter() });

describe('Create Model Step4 unit shallow test suits', () => {
  const wrapper = shallow(<Step4.WrappedComponent user={{ currentUser: {} }} />);
  it('#1 Step4 Form rendering', () => {
    expect(wrapper.find('FormItem').length).toBe(3);
  });
  it('#1 Step4 Divider rendering', () => {
    expect(wrapper.find('Divider').length).toBe(1);
  });
});
