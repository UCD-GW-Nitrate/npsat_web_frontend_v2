import request from 'umi-request';

export async function createModel(params, token) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
