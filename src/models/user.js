import { queryCurrent, query as queryUsers } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { userLogin } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { history } from 'umi';
import { notification } from 'antd';
import { stringify } from "querystring";

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    status: undefined,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      if (response.token) {
        yield put({
          type: 'saveCurrentUser',
          payload: response
        })

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      } else {
        const { data } = response;
        notification.error({
          description: 'Login failed, please try again',
          message: data.non_field_errors[0]
        })
      }
    },

    logout() {
      const { redirect } = getPageQuery();

      // further development warning: potential security leak if auth changes to cookies!

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      if (action.payload.is_superuser) {
        setAuthority('admin');
      } else if (action.payload.is_staff) {
        setAuthority('staff');
      } else {
        setAuthority('user');
      }
      return { ...state, currentUser: action.payload || {} };
    },
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status };
    },
  },
};
export default UserModel;
