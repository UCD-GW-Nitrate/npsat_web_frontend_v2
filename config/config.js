// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user', 'staff'],
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              component: './dashboard',
            },
            {
              name: 'models',
              icon: 'appstore',
              path: '/model',
              routes: [
                {
                  name: 'overview',
                  icon: 'bars',
                  path: '/model/overview',
                  component: './model/overview',
                },
                {
                  name: 'createModel',
                  icon: 'appstoreAdd',
                  path: '/model/create',
                  component: './model/create-model',
                },
                {
                  name: 'viewModel',
                  icon: 'edit',
                  path: '/model/view',
                  component: './model/view/components/SecurityRouter'
                },
                {
                  name: 'modifyModel',
                  icon: 'copy',
                  path: '/model/modify',
                  component: './model/modify',
                },
              ],
            },
            {
              name: 'compare',
              icon: 'lineChart',
              path: '/compare',
              routes: [
                {
                  name: 'compareWithBase',
                  icon: 'barChart',
                  path: '/compare/BAU',
                  component: './results/compare/components/SecurityRouter',
                },
                {
                  name: 'viewGroupResults',
                  icon: 'heatMap',
                  path: '/compare/group',
                  component: './results/group/components/SecurityRouter',
                },
              ],
            },
            // {
            //   name: 'team',
            //   icon: 'team',
            //   path: '/team',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
