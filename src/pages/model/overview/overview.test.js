/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OverviewList from './index.jsx';

configure({ adapter: new Adapter() });

describe('Overview unit shallow test suits', () => {
  const wrapper = shallow(<OverviewList.WrappedComponent user={{ currentUser: {}, status: {} }} loading={{ effects: {} }}/>);
  it("#1 page rendering", () => {
    expect(wrapper.find('PageHeaderWrapper').length).toBe(1);
  })
  it("#2 content rendering", () => {
    expect(wrapper.find('ContextProvider').length).toBe(1);
  })
});
