import request from '@/utils/request';
import apiConfig from '../../config/apiConfig';

const { apiRoot } = apiConfig;

export const CROP_MACROS = {
  SWAT_CROP: 0,
  GNLM_CROP: 1,
  GENERAL_CROP: 2,
  ALL_OTHER_CROP: 3,
};

export async function getCropList() {
  return request(`${apiRoot}/api/crop/`);
}

export async function getCropListLoadType(flow_scenario) {
  return request(`${apiRoot}/api/crop/`, {
    params: {
      flow_scenario,
    },
  });
}
