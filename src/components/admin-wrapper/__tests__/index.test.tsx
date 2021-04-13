import 'jsdom-global/register';

import { Alert } from '@chakra-ui/react';
import { act } from '@testing-library/react';
import AdminWrapper from 'components/admin-wrapper';
import {
  AuthenticationRepositoryProvider,
  DefaultAuthenticationUser,
} from 'context/authentication';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { err, ok, Result } from 'types/result';

describe('AdminWrapper', () => {
  const defaultAuthRepoInstance = {
    login: async () =>
      err(new Error('authentication repository not initialized'), ''),
    logout: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    get: () =>
      err(
        new Error('authentication repository not initialized'),
        DefaultAuthenticationUser,
      ),
    register: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    updatePassword: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    sendPasswordResetEmail: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    getClaim: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    onAuthStateChanged: () => {},
  };

  it('should render nothing if user is not an admin', async () => {
    let wrapper = shallow(
      <AuthenticationRepositoryProvider
        instance={{
          ...defaultAuthRepoInstance,
          getClaim: async (): Promise<Result<Error, any>> =>
            Promise.resolve(err<Error, any>(new Error(), undefined)),
        }}
      >
        <AdminWrapper>
          <div id="inner-div">Inside wrapper</div>
        </AdminWrapper>
      </AuthenticationRepositoryProvider>,
    );

    await act(async () => {
      jest.runAllTimers();
      wrapper = wrapper.update();
    });

    const innerDiv = wrapper.find('#inner-div');
    expect(innerDiv.length).toBe(0);
  });

  describe('if user is an admin', () => {
    it('should render the children', async () => {
      let wrapper = shallow(
        <AuthenticationRepositoryProvider
          instance={{
            ...defaultAuthRepoInstance,
            getClaim: async (): Promise<Result<Error, any>> =>
              Promise.resolve(ok<Error, any>(true)),
          }}
        >
          <AdminWrapper>
            <div id="inner-div">Inside wrapper</div>
          </AdminWrapper>
        </AuthenticationRepositoryProvider>,
      );

      await act(async () => {
        jest.runAllTimers();
        wrapper = wrapper.update();
      });
      const innerDiv = wrapper.find('#inner-div');

      console.log(innerDiv);
      expect(wrapper.find('#inner-div').text()).toBe('Inside wrapper');
      expect(wrapper).not.toBeUndefined();
    });

    /* it('should render the warning banner', async () => {
      const wrapper = mount(
        <AuthenticationRepositoryProvider
          instance={{
            ...defaultAuthRepoInstance,
            getClaim: async (): Promise<Result<Error, any>> =>
              Promise.resolve(ok<Error, any>(true)),
          }}
        >
          <AdminWrapper>
            <div id="inner-div">Inside wrapper</div>
          </AdminWrapper>
        </AuthenticationRepositoryProvider>,
      );

      act(() => {
        jest.runAllImmediates();
      });
      expect(wrapper.find(Alert)).toHaveLength(1);
    }); */
  });
});
