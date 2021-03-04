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
        modifications,
        name,
        description
      } = state.targetModel;
      const { region_type } = regions[0];
      const loadedCrops = regions.map((region) => region.id);
      switch (state.current) {
        case 'Modify Info':
          return {
            ...state,
            step: {
              ...state.step,
              "model-name": `${name} (copy)`,
              "model-desc": description
            }
          };
        case 'Modify Crops':
          return {
            ...state,
            step: {
              ...state.step,
              selectedCrops: modifications.map(modification => `${modification.crop.id},${modification.crop.name}`),
              "crop-choice": modifications.map(modification => ({
                enable: true,
                load: parseFloat(modification.proportion) * 100,
                id: modification.crop.id
              })).reduce((acc, curr) => ({ ...acc, [curr.id]: { ...curr } }), {}),
            }
          };
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
        modifications,
        name,
        description
      } = payload;
      const { region_type } = regions[0];
      const loadedRegions = regions.map((region) => region.id);
      return {
        ...state,
        targetModel: { ...payload },
        step: {
          ...state.step,
          // step1 pre fill
          step1Type: region_type,
          [`region-${region_type}-choice`]: loadedRegions,

          // step2 pre fill
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

          // step3 pre fill
          selectedCrops: modifications.map(modification => `${modification.crop.id},${modification.crop.name}`),
          "crop-choice": modifications.map(modification => ({
            enable: true,
            load: parseFloat(modification.proportion) * 100,
            id: modification.crop.id
          })).reduce((acc, curr) => ({ ...acc, [curr.id]: { ...curr } }), {}),

          // step4 pre fill
          "model-name": `${name} (copy)`,
          "model-desc": description
        },
      };
    },

    clearStoredStepInfo(state) {
      return { ...state, step: {}, results: {} };
    },
  },
};
export default Model;
