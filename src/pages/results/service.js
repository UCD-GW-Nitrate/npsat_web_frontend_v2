import request from '@/utils/request';
import apiConfig from '../../../config/apiConfig';

const { apiRoot } = apiConfig;

export async function getModelAndBaseModel(params, token) {
  return request(`${apiRoot}/api/model_run/${params.id}/`, {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
    params: { includeBase: true },
  });
}

export async function getModel(params, token) {
  return request(`${apiRoot}/api/model_run/${params.id}/`, {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
  });
}
