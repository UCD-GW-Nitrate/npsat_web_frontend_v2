import request from '@/utils/request';
import apiConfig from '../../config/apiConfig';

const { apiRoot } = apiConfig;

export async function userLogin(params) {
  return request(`${apiRoot}/api-token-auth/`, {
    method: 'POST',
    data: params,
  });
}
