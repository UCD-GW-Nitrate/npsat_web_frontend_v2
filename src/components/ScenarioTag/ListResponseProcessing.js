/**
 * additional processor for antd pro table
 * @param {Object} response return value of {@link queryModelList}
 * @param {number} userId number representing id of user
 * @returns {{total, data: []}} a modification of the model list with the appropriate tags
 * @constructor
 */
const ListResponseProcessing = (response, userId) => {
  const { results } = response;
  const data = [];
  results.forEach((temp) => {
    const model = temp;
    model.key = model.id;
    model.tags = [];
    if (model.public) {
      model.tags.push('public');
    }
    if (model.is_base) {
      model.tags.push('base');
    }
    if (model.user === userId) {
      model.tags.push('original');
    }

    data.push(model);
  });
  return {
    data,
    total: response.count,
  };
};

export default ListResponseProcessing;