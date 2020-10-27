import request from '@/utils/request';

export async function getFeed(token) {
  return request(`/api/feed/`, {
    method: 'GET',
    headers: { Authorization: `Token ${token}` },
  });
}
