

const Model = {
  namespace: 'CopyAndModifyModelForm',
  state: {
    current: 'Select Model',
    step: {},
    results: {
      id: null,
    },
  },
  effects: {
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
