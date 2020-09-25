import request from '@/utils/request';

export async function getModelAndBaseModel(params, token) {
  return request(`/api/model_run/${params.id}/`, {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
    params: { includeBase: true }
  });
}

export async function getGroupOfModels(params, token) {
  return request(`/api/model_run/${params.id}/`, {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
    data: { id: params.id },
  });
}
