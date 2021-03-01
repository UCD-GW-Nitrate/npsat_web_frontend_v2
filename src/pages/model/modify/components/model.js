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
      const { regions } = state.targetModel;
      const { region_type } = regions[0];
      const loadedCrops = regions.map((region) => region.id);
      switch (state.current) {
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
      return { ...state, targetModel: { ...payload } };
    },

    clearStoredStepInfo(state) {
      return { ...state, step: {}, results: {} };
    },
  },
};
export default Model;
