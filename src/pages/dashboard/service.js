import request from '@/utils/request';
import apiConfig from '../../../config/apiConfig';

const { apiRoot } = apiConfig;

/**
 * backend interface to get feed for dashboard
 * @param token
 * @returns {Promise<any>}
 */
export async function getFeed(token) {
  return request(`${apiRoot}/api/feed/`, {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
  });
}
