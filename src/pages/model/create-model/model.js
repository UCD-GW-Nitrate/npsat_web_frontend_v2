import { createModel } from './service';

const Model = {
  namespace: 'createModelForm',
  state: {
    current: 'Select Regions',
    step: {},
    results: {}
  },
  effects: {
    *createModel({ payload }, { call, put }) {
      let response;
      try {
        switch (payload.step1Type) {
          case "CV":
            // TODO: after backend sync
            break;
          default:
          case "county":
            response = yield call(createModel,
              {
                name: payload["model-name"],
                description: payload["model-desc"],
                county: payload["county-choice"],
                modifications: []
              },
              {
                token: payload.token, id: payload.user_id
              });
        }

        if (response.id) {
          yield put({
            type: 'saveCreateModelResult',
            payload: response.id
          })
        }
      } catch (e) {
        yield put({
          type: 'saveCreateModelResult',
          payload: -1 // general error code
        })
      }
    }
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
      return { ...state, step: {}, results: {}}
    }
  },
};
export default Model;
