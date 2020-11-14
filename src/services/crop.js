import request from '@/utils/request';

export const CROP_MACROS = {
  SWAT_CROP: 0,
  GNLM_CROP: 1,
  GENERAL_CROP: 2,
  ALL_OTHER_CROP: 3,
};

export async function getCropList() {
  return request('/api/crop/');
}

export async function getCropListLoadType(flow_scenario) {
  return request('/api/crop/', {
    params: {
      flow_scenario,
    },
  });
}
