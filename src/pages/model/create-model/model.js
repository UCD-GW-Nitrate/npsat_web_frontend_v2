import { createModel } from './service';

const Model = {
  namespace: 'createModelForm',
  state: {
    current: 'Select Regions',
    step: {},
  },
  effects: {
    // *submitStepForm({ payload }, { call, put }) {
    //   yield call(c, payload);
    //   yield put({
    //     type: 'saveStepFormData',
    //     payload,
    //   });
    //   yield put({
    //     type: 'saveCurrentStep',
    //     payload: 'result',
    //   });
    // },
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },
  },
};
export default Model;
