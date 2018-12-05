const DEFAULT_SORT = 'name_ASC';

function getSort(orderBy = DEFAULT_SORT) {
  const [key, order] = orderBy.split('_');

  return { key, order: order.toLowerCase() };
}

module.exports = { getSort };
