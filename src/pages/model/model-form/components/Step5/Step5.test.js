/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Step5 from './index.jsx';

configure({ adapter: new Adapter() });

describe('Create Model Step4 unit shallow test suits', () => {
  const wrapper = shallow(<Step5.WrappedComponent user={{ currentUser: {} }} />);
  it('#1 Step4 Form rendering', () => {
    expect(wrapper.find('Result').length).toBe(1);
  });
});
