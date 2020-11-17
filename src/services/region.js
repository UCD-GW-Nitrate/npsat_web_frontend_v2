import request from '@/utils/request';

export const REGION_MACROS = {
  CENTRAL_VALLEY: 0,
  SUB_BASIN: 1,
  CVHM_FARM: 2,
  B118_BASIN: 3,
  COUNTY: 4,
  TOWNSHIPS: 5,
  C2V_SIM_SUBREGIONS: 6,
};

export async function getRegions(type) {
  return request('/api/region/', {
    params: { offset: 0, region_type: type, limit: 2000 },
  });
}

export function getCounties() {
  return getRegions(REGION_MACROS.COUNTY);
}

export function getCentralValley() {
  return getRegions(REGION_MACROS.CENTRAL_VALLEY);
}

export function getCVHMFarms() {
  return getRegions(REGION_MACROS.CVHM_FARM);
}

export function getBasins() {
  return getRegions(REGION_MACROS.SUB_BASIN);
}

export function getB118Basin() {
  return getRegions(REGION_MACROS.B118_BASIN);
}

export function getTownships() {
  return getRegions(REGION_MACROS.TOWNSHIPS);
}
