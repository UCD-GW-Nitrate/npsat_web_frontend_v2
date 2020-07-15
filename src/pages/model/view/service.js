import request from '@/utils/request';

export async function getModelDetail(params, token) {
  return request(`/api/model_run/${params.id}`, {
    method: 'GET',
    headers: { 'Authorization': `Token ${token}` },
    data: { id: params.id },
  });
}

export async function getCountyDetail(params) {
  return request(`/api/county/${params.id}`, {
    method: 'GET'
  })
}

export async function getModificationsDetails(params, token) {
  return request(`/api/modification/${params.id}`, {
    headers: { 'Authorization': `Token ${token}` },
    method: 'GET'
  })
}

export async function getCropDetails(params) {
  return request(`/api/crops/${params.id}`, {
    method: 'GET'
  })
}
