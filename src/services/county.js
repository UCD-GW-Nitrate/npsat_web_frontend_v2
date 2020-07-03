import request from '@/utils/request';

export async function getCountyList() {
  return request('/api/county/')
}
