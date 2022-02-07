import { createModel } from '@/services/model';
import { REGION_MACROS } from '@/services/region';

const Model = {
  namespace: 'createModelForm',
  state: {
    current: 'Select Settings',
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
            if (
              // case when all other crops being set (it does contain "enable")
              !payload['crop-choice'][id].hasOwnProperty('enable') ||
              // case when normal crops are enabled
              payload['crop-choice'][id].enable
            ) {
              modifications.push({
                crop: { id },
                proportion: payload['crop-choice'][id].load / 100,
              });
            }
          } else if (payload['crop-choice'] && !payload['crop-choice'].hasOwnProperty(id)) {
            // case when 'all other crops' is not toggled/touched
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
          welltype_scenario: { id: payload.welltype_scenario },
          regions: payload.regions,
          modifications,
          public: false,
          is_base: isBAU,
          applied_simulation_filter: payload.regionFilter,
        };

        switch (payload.step2Type) {
          case REGION_MACROS.CENTRAL_VALLEY:
            data.regions = [{ id: payload.CV }];
            break;
          default:
          case REGION_MACROS.COUNTY:
          case REGION_MACROS.CVHM_FARM:
          case REGION_MACROS.B118_BASIN:
          case REGION_MACROS.TOWNSHIPS:
            data.regions = payload[`region-${payload.step2Type}-choice`].map((id) => ({ id }));
        }

        // add region filter if applicable
        if (payload.regionFilter) {
          if (payload.hasOwnProperty('depth_range')) {
            const [min, max] = payload.depth_range;
            data.depth_range_max = max;
            data.depth_range_min = min;
          }

          if (payload.hasOwnProperty('screen_length_range')) {
            const [min, max] = payload.screen_length_range;
            data.screen_length_range_max = max;
            data.screen_length_range_min = min;
          }
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
