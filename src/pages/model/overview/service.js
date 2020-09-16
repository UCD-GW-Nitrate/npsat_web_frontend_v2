import request from '@/utils/request';

export async function queryModelList(params, token, filter) {
  const { pageSize, current } = params;
  return request('/api/model_run', {
    headers: { 'Authorization': `Token ${token}` },
    params: {
      limit: pageSize,
      offset: pageSize * (current - 1),
      public: filter.includes("public"),
      isBase: filter.includes("base"),
      origin: filter.includes("original")
    }
  })
}

export async function deleteModel(params, token) {
  return request(`/api/model_run/${params.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Token ${token}` }
  })
}
