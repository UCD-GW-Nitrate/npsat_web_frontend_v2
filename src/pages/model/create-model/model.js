import { createModel } from './service';

const Model = {
  namespace: 'createModelForm',
  state: {
    current: 'Select Regions',
    step: {},
    results: {
      id: null,
    },
  },
  effects: {
    *createModel({ payload }, { call, put }) {
      let response;
      try {
        const crops = payload.selectedCrops;
        const modifications = [];
        crops.forEach((crop) => {
          const [id, name] = crop.split(',');
          if (payload['crop-choice'].hasOwnProperty(id) && payload['crop-choice'][id].enable) {
            modifications.push({
              crop: { id },
              proportion: payload['crop-choice'][id].load / 100,
            });
          } else {
            modifications.push({
              crop: { id },
              proportion: 1,
            });
          }
        });
        const data = {
          name: payload['model-name'],
          description: payload['model-desc'],
          water_content: payload.water_content / 100,
          n_years: new Date(payload.n_years).getFullYear() - 1945,
          reduction_start_year: new Date(payload.reduction_year[0]).getFullYear(),
          reduction_end_year: new Date(payload.reduction_year[1]).getFullYear(),
          flow_scenario: { id: payload.flow_scenario },
          load_scenario: { id: payload.load_scenario },
          unsat_scenario: { id: payload.unsat_scenario },
          modifications,
        };

        switch (payload.step1Type) {
          case 'CV':
            data.regions = [{ id: payload.CV }];
            break;
          default:
          case 'county':
          case 'farm':
          case 'basin':
          case 'township':
            data.regions = payload[`${payload.step1Type}-choice`].map((id) => ({ id }));
        }

        response = yield call(createModel, data, {
          token: payload.token,
          id: payload.user_id,
        });

        if (response.id) {
          yield put({
            type: 'saveCreateModelResult',
            payload: response.id,
          });
        }
      } catch (e) {
        console.log(e);
        yield put({
          type: 'saveCreateModelResult',
          payload: -1, // general error code
        });
      }
    },
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
      return { ...state, step: {}, results: {} };
    },
  },
};
export default Model;
