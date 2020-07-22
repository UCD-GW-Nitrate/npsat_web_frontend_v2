import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModelDetail from './index.jsx';

configure({ adapter: new Adapter() });

it('renders with Result', () => {
  const wrapper = shallow(<ModelDetail />);
  expect(wrapper.find('Card').length).toBe(4);
});
