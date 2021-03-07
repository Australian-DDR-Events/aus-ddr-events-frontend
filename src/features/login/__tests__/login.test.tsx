import { shallow } from 'enzyme';
import React from 'react';

import Login from '..';
import LoginForm from '../login-form';

describe('Login', () => {
  test('should render LoginForm', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(LoginForm)).toBeTruthy();
  });
});
