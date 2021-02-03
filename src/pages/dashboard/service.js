import request from '@/utils/request';

/**
 * backend interface to get feed for dashboard
 * @param token
 * @returns {Promise<any>}
 */
export async function getFeed(token) {
  return request(`/api/feed/`, {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
  });
}
