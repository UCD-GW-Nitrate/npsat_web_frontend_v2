import request from '@/utils/request';
import apiConfig from '../../../../config/apiConfig';

const { apiRoot } = apiConfig;

export async function getModelDetail(params, token) {
  return request(`${apiRoot}/api/model_run/${params.id}/`, {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
    data: { id: params.id },
  });
}

export async function getRegionDetail(params) {
  return request(`${apiRoot}/api/region/${params.id}/`, {
    method: 'GET',
  });
}

export async function getModificationsDetails(params, token) {
  return request(`${apiRoot}/api/modification/${params.id}/`, {
    headers: { Authorization: `Token ${token}` },
    method: 'GET',
  });
}

export async function getCropDetails(params) {
  return request(`${apiRoot}/api/crops/${params.id}/`, {
    method: 'GET',
  });
}

export async function getModelResults(id, token) {
  return request(`${apiRoot}/api/model_result/${id}/`, {
    headers: { Authorization: `Token ${token}` },
    method: 'GET',
  });
}

export async function putModel(id, params, token) {
  return request(`${apiRoot}/api/model_run/${id}/`, {
    headers: { Authorization: `Token ${token}` },
    method: 'PUT',
    data: params,
  });
}
