import { createModel } from './service';

const Model = {
  namespace: 'createModelForm',
  state: {
    current: 'Select Regions',
    step: {},
    results: {}
  },
  effects: {
    *createModel({ payload }, { call, put }) {
      let response;
      try {
        const crops = payload["crop-choice"];
        const modifications = [];
        for (const [ key, value ] of Object.entries(crops)) {
          if (value.enable) {
            modifications.push({
              crop: key,
              proportion: value.load / 100,
            })
          }
        }
        const data = {
          name: payload["model-name"],
          description: payload["model-desc"],
          water_content: payload.water_content / 100,
          n_years: payload.n_years,
          reduction_year: new Date(payload.reduction_year).getFullYear(),
          scenario_name: payload.scenario_name,
          modifications
        };

        switch (payload.step1Type) {
          case "CV":
              data.regions = [ { id: payload.CV } ];
            break;
          default:
          case "county":
          case "farm":
            data.regions = payload[`${payload.step1Type}-choice`].map(id => ( { id } ));
        }

        response = yield call(createModel,
          data, {
            token: payload.token, id: payload.user_id
          });

        if (response.id) {
          yield put({
            type: 'saveCreateModelResult',
            payload: response.id
          })
        }
      } catch (e) {
        yield put({
          type: 'saveCreateModelResult',
          payload: -1 // general error code
        })
      }
    }
  },
  reducers: {
    saveCreateModelResult(state, { payload }) {
      return { ...state, results: { id: payload } };
    },

    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },

    clearStoredStepInfo(state) {
      return { ...state, step: {}, results: {}}
    }
  },
};
export default Model;
