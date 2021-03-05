import { createModel } from '@/services/model';
import { REGION_MACROS } from '@/services/region';

const Model = {
  namespace: 'createModelForm',
  state: {
    current: 'Select Regions',
    step: { is_base: false },
    results: {
      id: null,
    },
  },
  effects: {
    *createModel({ payload }, { call, put }) {
      let response;
      try {
        const crops = payload.selectedCrops || [];
        const isBAU = payload.is_base;
        const modifications = [];
        crops.forEach((crop) => {
          const [id, name] = crop.split(',');
          if (payload['crop-choice'] && payload['crop-choice'].hasOwnProperty(id)) {
            if (payload['crop-choice'][id].enable) {
              modifications.push({
                crop: { id },
                proportion: payload['crop-choice'][id].load / 100,
              });
            }
          } else {
            // case for All other crops
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
          sim_end_year: new Date(payload.sim_end_year).getFullYear(),
          reduction_start_year: isBAU ? 2020 : new Date(payload.reduction_year[0]).getFullYear(),
          reduction_end_year: isBAU ? 2025 : new Date(payload.reduction_year[1]).getFullYear(),
          flow_scenario: { id: payload.flow_scenario },
          load_scenario: { id: payload.load_scenario },
          unsat_scenario: { id: payload.unsat_scenario },
          modifications,
          public: false,
          is_base: isBAU,
        };

        switch (payload.step1Type) {
          case REGION_MACROS.CENTRAL_VALLEY:
            data.regions = [{ id: payload.CV }];
            break;
          default:
          case REGION_MACROS.COUNTY:
          case REGION_MACROS.CVHM_FARM:
          case REGION_MACROS.B118_BASIN:
          case REGION_MACROS.TOWNSHIPS:
            data.regions = payload[`region-${payload.step1Type}-choice`].map((id) => ({ id }));
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
