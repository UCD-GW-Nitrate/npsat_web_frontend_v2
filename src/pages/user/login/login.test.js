/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './index.jsx';
import LoginSub from './components/Login/index.jsx';

configure({ adapter: new Adapter() });

describe('Login page unit test suits', () => {
  const wrapper = shallow(
    <Login.WrappedComponent user={{ currentUser: {}, status: {} }} loading={{ effects: {} }} />,
  );
  it('#1 LoginForm rendering', () => {
    expect(wrapper.find(LoginSub).length).toBe(1);
  });
  it('#3 submit button rendering', () => {
    expect(wrapper.find('LoginSubmit').length).toBe(1);
  });
});
