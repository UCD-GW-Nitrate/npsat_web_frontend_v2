import request from 'umi-request';

export async function createModel(params, user) {
  return request('/api/model_run/', {
    method: 'POST',
    headers: { 'Authorization': `Token ${user.token}` },
    data: {
      ...params,
      user: user.id
    },
  });
}

export async function modifyModel(params, user) {
  return request('/api/modification/', {
    method: 'POST',
    headers: { 'Authorization': `Token ${user.token}` },
    data: {
      ...params
    }
  })
}
