import moment from 'moment';
import { REGION_MACROS } from '@/services/region';
import { createModel } from '@/services/model';

const Model = {
  namespace: 'copyAndModifyModelForm',
  state: {
    current: 'Select Settings',
    step: {},
    results: {
      id: null,
    },
    targetModel: {},
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
          welltype_scenario: { id: payload.welltype_scenario },
          modifiedRegions: payload.modifiedRegions,
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

    loadTemplateAtStep(state) {
      const {
        regions,
        flow_scenario,
        load_scenario,
        welltype_scenario,
        unsat_scenario,
        reduction_end_year,
        reduction_start_year,
        water_content,
        is_base,
        sim_end_year,
        modifications,
        name,
        description,
        applied_simulation_filter: regionFilter,
      } = state.targetModel;
      const { region_type } = regions[0];
      const regionFilterParams = {};
      if (regionFilter) {
        const {
          depth_range_max,
          depth_range_min,
          screen_length_range_max,
          screen_length_range_min,
        } = state.targetModel;
        regionFilterParams.depth_range = [parseFloat(depth_range_min), parseFloat(depth_range_max)];
        regionFilterParams.screen_length_range = [
          parseFloat(screen_length_range_min),
          parseFloat(screen_length_range_max),
        ];
      }
      const loadedCrops = regions.map((region) => region.id);
      switch (state.current) {
        case 'Modify Info':
          return {
            ...state,
            step: {
              ...state.step,
              'model-name': `${name} (copy)`,
              'model-desc': description,
            },
          };
        case 'Modify Crops':
          return {
            ...state,
            step: {
              ...state.step,
              selectedCrops: modifications.map(
                (modification) => `${modification.crop.id},${modification.crop.name}`,
              ),
              'crop-choice': modifications
                .map((modification) => ({
                  enable: true,
                  load: (parseFloat(modification.proportion).toFixed(3) * 100).toFixed(0),
                  id: modification.crop.id,
                }))
                .reduce((acc, curr) => ({ ...acc, [curr.id]: { ...curr } }), {}),
            },
          };
        case 'Modify Settings':
          return {
            ...state,
            step: {
              ...state.step,
              flow_scenario: flow_scenario.id,
              load_scenario: load_scenario.id,
              welltype_scenario: welltype_scenario.id,
              unsat_scenario: unsat_scenario.id,
              water_content,
              sim_end_year: moment(sim_end_year.toString()),
              reduction_year: [
                moment(reduction_start_year.toString()),
                moment(reduction_end_year.toString()),
              ],
              is_base,
            },
          };
        default:
        case 'Modify Regions':
          return {
            ...state,
            step: {
              ...state.step,
              step2Type: region_type,
              [`region-${region_type}-choice`]: loadedCrops,
              regionFilter,
              ...regionFilterParams,
            },
          };
      }
    },

    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },

    saveTargetModelInfo(state, { payload }) {
      const {
        regions,
        flow_scenario,
        load_scenario,
        welltype_scenario,
        unsat_scenario,
        reduction_end_year,
        reduction_start_year,
        water_content,
        is_base,
        sim_end_year,
        modifications,
        name,
        description,
        applied_simulation_filter: regionFilter,
      } = payload;
      const regionFilterParams = {};
      if (regionFilter) {
        const {
          depth_range_max,
          depth_range_min,
          screen_length_range_max,
          screen_length_range_min,
        } = payload;
        regionFilterParams.depth_range = [parseFloat(depth_range_min), parseFloat(depth_range_max)];
        regionFilterParams.screen_length_range = [
          parseFloat(screen_length_range_min),
          parseFloat(screen_length_range_max),
        ];
      }
      const { region_type } = regions[0];
      const loadedRegions = regions.map((region) => region.id);
      return {
        ...state,
        targetModel: { ...payload },
        step: {
          ...state.step,
          // step1 pre fill
          step2Type: region_type,
          [`region-${region_type}-choice`]: loadedRegions,
          regionFilter,
          ...regionFilterParams,

          // step2 pre fill
          flow_scenario: flow_scenario.id,
          load_scenario: load_scenario.id,
          welltype_scenario: welltype_scenario.id,
          unsat_scenario: unsat_scenario.id,
          water_content,
          sim_end_year: moment(sim_end_year.toString()),
          reduction_year: [
            moment(reduction_start_year.toString()),
            moment(reduction_end_year.toString()),
          ],
          is_base,

          // step3 pre fill
          selectedCrops: modifications.map(
            (modification) => `${modification.crop.id},${modification.crop.name}`,
          ),
          'crop-choice': modifications
            .map((modification) => ({
              enable: true,
              load: (parseFloat(modification.proportion).toFixed(3) * 100).toFixed(0),
              id: modification.crop.id,
            }))
            .reduce((acc, curr) => ({ ...acc, [curr.id]: { ...curr } }), {}),

          // step4 pre fill
          'model-name': `${name} (copy)`,
          'model-desc': description,
        },
      };
    },

    clearStoredStepInfoAndReload(state) {
      const {
        regions,
        flow_scenario,
        load_scenario,
        welltype_scenario,
        unsat_scenario,
        reduction_end_year,
        reduction_start_year,
        water_content,
        is_base,
        sim_end_year,
        modifications,
        name,
        description,
        applied_simulation_filter: regionFilter,
      } = state.targetModel;
      const regionFilterParams = {};
      if (regionFilter) {
        const {
          depth_range_max,
          depth_range_min,
          screen_length_range_max,
          screen_length_range_min,
        } = state.targetModel;
        regionFilterParams.depth_range = [parseFloat(depth_range_min), parseFloat(depth_range_max)];
        regionFilterParams.screen_length_range = [
          parseFloat(screen_length_range_min),
          parseFloat(screen_length_range_max),
        ];
      }
      const { region_type } = regions[0];
      const loadedRegions = regions.map((region) => region.id);
      return {
        ...state,
        results: {},
        step: {
          ...state.step,
          // step1 pre fill
          step2Type: region_type,
          [`region-${region_type}-choice`]: loadedRegions,
          regionFilter,
          ...regionFilterParams,

          // step2 pre fill
          flow_scenario: flow_scenario.id,
          load_scenario: load_scenario.id,
          welltype_scenario: welltype_scenario.id,
          unsat_scenario: unsat_scenario.id,
          water_content,
          sim_end_year: moment(sim_end_year.toString()),
          reduction_year: [
            moment(reduction_start_year.toString()),
            moment(reduction_end_year.toString()),
          ],
          is_base,

          // step3 pre fill
          selectedCrops: modifications.map(
            (modification) => `${modification.crop.id},${modification.crop.name}`,
          ),
          'crop-choice': modifications
            .map((modification) => ({
              enable: true,
              load: (parseFloat(modification.proportion).toFixed(3) * 100).toFixed(0),
              id: modification.crop.id,
            }))
            .reduce((acc, curr) => ({ ...acc, [curr.id]: { ...curr } }), {}),

          // step4 pre fill
          'model-name': `${name} (copy)`,
          'model-desc': description,
        },
      };
    },
  },
};
export default Model;
