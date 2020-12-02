import request from '@/utils/request';

export const MODEL_STATUS_MACROS = {
  NOT_READY: 0,
  READY: 1,
  RUNNING: 2,
  COMPLETED: 3,
  ERROR: 4,
};

export async function searchModel(params, filter, token, search_text, ...options) {
  const { pageSize, current } = params;
  const [sorter, scenarios, status] = options;
  const query = {};
  if (search_text && search_text.trim().length !== 0) {
    query.search = search_text;
  }
  if (sorter && sorter.length !== 0) {
    query.sorter = sorter;
  }
  if (scenarios && scenarios.length > 0) {
    query.scenarios = scenarios.join(',');
  }
  if (status) {
    query.status = status.join(',');
  } else {
    query.status = '3';
  }
  if (filter) {
    query.public = filter.includes('public');
    query.isBase = filter.includes('base');
    query.origin = filter.includes('original');
  }

  return request('/api/model_run', {
    headers: { Authorization: `Token ${token}` },
    params: {
      limit: pageSize,
      offset: pageSize * (current - 1),
      ...query,
    },
  });
}
