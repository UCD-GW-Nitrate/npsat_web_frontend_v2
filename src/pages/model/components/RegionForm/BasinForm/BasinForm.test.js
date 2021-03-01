/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BasinForm from './index.jsx';

configure({ adapter: new Adapter() });

describe('Create Model Step1 CVForm unit shallow test suits', () => {
  const wrapper = shallow(<BasinForm.WrappedComponent createModelForm={{ step: {} }} />);
  it('#1 Form Item rendering', () => {
    expect(wrapper.find('FormItem').length).toBe(2);
  });
});