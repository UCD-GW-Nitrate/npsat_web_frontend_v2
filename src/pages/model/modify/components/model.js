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
