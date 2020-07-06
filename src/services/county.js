import request from '@/utils/request';

export async function getCountyList() {
  return request('/api/county/', {
    params: { offset: 0 }
  })
}
