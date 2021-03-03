import moment from 'moment';

const Model = {
  namespace: 'copyAndModifyModelForm',
  state: {
    current: 'Select Model',
    step: {},
    results: {
      id: null,
    },
    targetModel: {},
  },
  effects: {},
  reducers: {
    saveCreateModelResult(state, { payload }) {
      return { ...state, results: { id: payload } };
    },

    loadTemplateAtStep(state) {
      const {
        regions,
        flow_scenario,
        load_scenario,
        unsat_scenario,
        reduction_end_year,
        reduction_start_year,
        water_content,
        is_base,
        sim_end_year,
      } = state.targetModel;
      const { region_type } = regions[0];
      const loadedCrops = regions.map((region) => region.id);
      switch (state.current) {
        case 'Modify Settings':
          return {
            ...state,
            step: {
              ...state.step,
              flow_scenario: flow_scenario.id,
              load_scenario: load_scenario.id,
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
              step1Type: region_type,
              [`region-${region_type}-choice`]: loadedCrops,
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
        unsat_scenario,
        reduction_end_year,
        reduction_start_year,
        water_content,
        is_base,
        sim_end_year,
      } = payload;
      const { region_type } = regions[0];
      const loadedCrops = regions.map((region) => region.id);
      return {
        ...state,
        targetModel: { ...payload },
        step: {
          ...state.step,
          step1Type: region_type,
          [`region-${region_type}-choice`]: loadedCrops,
          flow_scenario: flow_scenario.id,
          load_scenario: load_scenario.id,
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
    },

    clearStoredStepInfo(state) {
      return { ...state, step: {}, results: {} };
    },
  },
};
export default Model;
