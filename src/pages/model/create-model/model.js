import { createModel, modifyModel } from './service';

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
        return;
      }

      const crops = payload["crop-choice"];
      let countTotal = 0;
      let countSuccess = 0;
      for (const [ key, value ] of Object.entries(crops)) {
        if (value.enable) {
          countTotal += 1;
          countSuccess += 1;
          try {
            yield call(modifyModel, {
              crop: key,
              proportion: value.load / 100,
              land_area_proportion: value.area / 100,
              model_run: response.id
            }, { token: payload.token })
          } catch (e) {
            countSuccess -= 1;
          }
        }
      }
      yield put({
        type: 'saveModificationResult',
        payload: {
          countSuccess,
          countTotal
        }
      })
    }
  },
  reducers: {
    saveCreateModelResult(state, { payload }) {
      return { ...state, results: { id: payload } };
    },

    saveModificationResult(state, { payload } ) {
      return { ...state, results: { modification: payload, ...state.results } };
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
