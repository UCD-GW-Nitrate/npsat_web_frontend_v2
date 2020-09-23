import request from '@/utils/request';

export async function searchModel(params, filter, token, search_text, ...options) {
  const { pageSize, current } = params;
  const [ sorter, scenarios ] = options;
  const query = {};
  if (search_text.trim().length !== 0) {
    query.search = search_text;
  }
  if (sorter && sorter.length !== 0) {
    query.sorter = sorter;
  }
  if (scenarios && scenarios.length > 0) {
    query.scenarios = scenarios.join(",");
  }

  return request('/api/model_run', {
    headers: { 'Authorization': `Token ${token}` },
    params: {
      limit: pageSize,
      offset: pageSize * (current - 1),
      public: filter.includes("public"),
      isBase: filter.includes("base"),
      origin: filter.includes("original"),
      status: "3",
      ...query
    }
  })
}