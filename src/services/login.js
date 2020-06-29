import request from '@/utils/request';

export async function userLogin(params) {
  return request('/api/dev/api-token-auth/', {
    method: 'POST',
    data: params,
  });
}
