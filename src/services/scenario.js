import request from '@/utils/request';
import apiConfig from '../../config/apiConfig';

const { apiRoot } = apiConfig;

export const SCENARIO_MACROS = {
  TYPE_FLOW: 1,
  TYPE_UNSAT: 2,
  TYPE_LOAD: 3,
};

export async function getScenarios(type) {
  if (type) {
    return request(`${apiRoot}/api/scenario`, {
      params: { scenario_type: type },
    });
  }
  return request(`${apiRoot}/api/scenario/`);
}

export async function getFlowScenario() {
  return getScenarios(SCENARIO_MACROS.TYPE_FLOW);
}

export async function getUnsatScenario() {
  return getScenarios(SCENARIO_MACROS.TYPE_UNSAT);
}

export async function getLoadScenario() {
  return getScenarios(SCENARIO_MACROS.TYPE_LOAD);
}
