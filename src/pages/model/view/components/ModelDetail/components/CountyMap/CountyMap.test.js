/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CountyMap from './index.jsx';

configure({ adapter: new Adapter() });

describe('County Map rendering', () => {
  const wrapper = shallow(<CountyMap data={[]}/>);
  it('#1 map rendering', () => {
    expect(wrapper.find('Map').length).toBe(1);
  });
});
