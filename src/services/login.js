import request from '@/utils/request';

export async function userLogin(params) {
  return request('/api-token-auth/', {
    method: 'POST',
    data: params,
  });
}
