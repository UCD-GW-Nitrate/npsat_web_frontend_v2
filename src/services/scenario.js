import request from '@/utils/request';

export async function getScenarios() {
  return request('/api/scenario/')
}
