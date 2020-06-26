// @ts-nocheck
import { ApplyPluginsType, dynamic } from 'D:/work/UCD/DiSSC_2020/front_end/npsat/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'D:/work/UCD/DiSSC_2020/front_end/npsat/src/layouts/UserLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "name": "login",
        "path": "/user/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'D:/work/UCD/DiSSC_2020/front_end/npsat/src/pages/user/login'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'D:/work/UCD/DiSSC_2020/front_end/npsat/src/layouts/SecurityLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'D:/work/UCD/DiSSC_2020/front_end/npsat/src/layouts/BasicLayout'), loading: require('@/components/PageLoading/index').default}),
        "routes": [
          {
            "path": "/",
            "redirect": "/dashboard",
            "exact": true
          },
          {
            "path": "/dashboard",
            "name": "dashboard",
            "icon": "dashboard",
            "exact": true
          },
          {
            "name": "models",
            "icon": "appstore",
            "path": "/model",
            "routes": [
              {
                "name": "overview",
                "icon": "bars",
                "path": "/model/overview",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__model__overview' */'D:/work/UCD/DiSSC_2020/front_end/npsat/src/pages/model/overview'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              },
              {
                "name": "createModel",
                "icon": "appstoreAdd",
                "path": "/model/create",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__model__create-model' */'D:/work/UCD/DiSSC_2020/front_end/npsat/src/pages/model/create-model'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              },
              {
                "name": "editModel",
                "icon": "edit",
                "path": "/model/edit",
                "exact": true
              }
            ]
          },
          {
            "name": "results",
            "icon": "lineChart",
            "path": "/charts",
            "exact": true
          },
          {
            "name": "team",
            "icon": "team",
            "path": "/team",
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/work/UCD/DiSSC_2020/front_end/npsat/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/work/UCD/DiSSC_2020/front_end/npsat/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/work/UCD/DiSSC_2020/front_end/npsat/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
    "exact": true
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
