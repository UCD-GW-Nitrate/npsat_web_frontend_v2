import request from '@/utils/request';
import apiConfig from '../../../../config/apiConfig';

const { apiRoot } = apiConfig;

export async function queryModelList(params, filter, token, ...options) {
  const { pageSize, current } = params;
  const [sorter, status] = options;
  const query = {};
  if (sorter.length !== 0) {
    query.sorter = sorter;
  }
  return request(`${apiRoot}/api/model_run`, {
    headers: { Authorization: `Token ${token}` },
    params: {
      limit: pageSize,
      offset: pageSize * (current - 1),
      public: filter.includes('public'),
      isBase: filter.includes('base'),
      origin: filter.includes('original'),
      status: status.join(','),
      ...query,
    },
  });
}

export async function deleteModel(params, token) {
  return request(`${apiRoot}/api/model_run/${params.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });
}
