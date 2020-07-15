import request from '@/utils/request';

export async function queryModelList(params, token) {
  const pageSize = 20;
  return request('/api/model_run', {
    headers: { 'Authorization': `Token ${token}` },
    params: { limit: params.pageSize, offset: pageSize * (params.current - 1) }
  })
}

export async function deleteModel(params, token) {
  return request(`/api/model_run/${params.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Token ${token}` }
  })
}
