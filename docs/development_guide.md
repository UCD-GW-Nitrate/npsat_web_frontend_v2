# NPSAT Frontend

## Set up

* Make sure to have the latest node installed.
* Clone the repo
* Run `npm install`
* Make sure you have the backend repo configured and started
* If you are doing development in local environment, 
  * in `config/apiConfig.js`, change `apiRoot` to an empty string
  * in `config/proxy.js`, change `dev - api - target` to the port your backend is hosted
  
* Run `npm run start` or explore another options provided in `package.json`

## Dependency Overview

This project is based on React, initialized and structure by [UmiJs](https://umijs.org/) and 
[Ant Design Pro](https://pro.ant.design/).

The main UI library used is [Ant Design](https://ant.design/). The main visualization library used is 
[BizChart](https://github.com/alibaba/BizCharts), but it is becoming slow and outdated in the community.

[Leaflet](https://react-leaflet.js.org/) is the map library used in the project.

[React-Redux](https://react-redux.js.org/) is used for data storage and updates. It is integrated into UmiJS as a
plugin. Sometimes `connect` is imported from `redux` and sometimes from `umi`. It is due to a 
[known issue](https://github.com/ant-design/ant-design-pro/issues/7055) of Umi and creates issue only with `Jest` for 
test suits. Feel free to use any sources for development other than tests.

Note: [Ant Design Charts](https://charts.ant.design/) might be an alternative for BizChart someday in the future. It is
currently under beta tests. It shares the same UI, APIs, internal algorithms, and visualization cores with BizCharts.
However, at this time, its algorithm is not optimized and renders much slower for large dataset.

## Folder Structures & Config & Plugins

Check UmiJS/Ant Design Pro docs for answers.

## Tests

Unit tests and e2e tests are not update to date. `Jest` and `Enzyme` are used for test suits.
