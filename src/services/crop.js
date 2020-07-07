import request from '@/utils/request';

export async function getCropList() {
  return request('/api/crops/');
}
