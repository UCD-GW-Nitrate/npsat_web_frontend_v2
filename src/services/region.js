import request from '@/utils/request';

export async function getRegions(type) {
  return request('/api/region/', {
    params: { offset: 0, region_type: type },
  });
}

export function getCounties() {
  return getRegions('County');
}

export function getCentralValley() {
  return getRegions('Central Valley');
}

export function getCVHMFarms() {
  return getRegions('CVHMFarm');
}
