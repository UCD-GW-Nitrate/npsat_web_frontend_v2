import request from 'umi-request';
import apiConfig from '../../config/apiConfig';

const { apiRoot } = apiConfig;

export const MODEL_STATUS_MACROS = {
  NOT_READY: 0,
  READY: 1,
  RUNNING: 2,
  COMPLETED: 3,
  ERROR: 4,
};

export const DEPTH_RANGE_CONFIG = {
  min: 0,
  max: 800,
  step: 1,
};

export const SCREEN_LENGTH_RANGE_CONFIG = {
  min: 0,
  max: 800,
  step: 1,
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

  return request(`${apiRoot}/api/model_run`, {
    headers: { Authorization: `Token ${token}` },
    params: {
      limit: pageSize,
      offset: pageSize * (current - 1),
      ...query,
    },
  });
}

export async function createModel(params, user) {
  return request(`${apiRoot}/api/model_run/`, {
    method: 'POST',
    headers: { Authorization: `Token ${user.token}` },
    data: {
      ...params,
    },
  });
}

export async function modifyModel(params, user) {
  return request(`${apiRoot}/api/modification/`, {
    method: 'POST',
    headers: { Authorization: `Token ${user.token}` },
    data: {
      ...params,
    },
  });
}

export async function getModelsStatus(params, user) {
  return request(`${apiRoot}/api/model_run__status/`, {
    method: 'GET',
    headers: { Authorization: `Token ${user.token}` },
    params: {
      ...params,
    },
  });
}
