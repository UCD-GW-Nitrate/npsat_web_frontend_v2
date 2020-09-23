import request from '@/utils/request';

export async function getModelDetail(params, token) {
  return request(`/api/model_run/${params.id}/`, {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
    data: { id: params.id },
  });
}

export async function getModelList(params, token) {
  const pageSize = 20;
  return request('/api/model_run/', {
    headers: { Authorization: `Token ${token}` },
    params: { limit: pageSize, offset: pageSize * (params.current - 1) },
  });
}

export async function getRegionDetail(params) {
  return request(`/api/region/${params.id}/`, {
    method: 'GET',
  });
}

export async function getModificationsDetails(params, token) {
  return request(`/api/modification/${params.id}/`, {
    headers: { Authorization: `Token ${token}` },
    method: 'GET',
  });
}

export async function getCropDetails(params) {
  return request(`/api/crops/${params.id}/`, {
    method: 'GET',
  });
}

export async function getModelResults(id, token) {
  return request(`/api/model_results/${id}/`, {
    headers: { Authorization: `Token ${token}` },
    method: 'GET',
  });
}

export async function putModel(id, params, token) {
  return request(`/api/model_run/${id}/`, {
    headers: { Authorization: `Token ${token}` },
    method: 'PUT',
    data: params,
  });
}
