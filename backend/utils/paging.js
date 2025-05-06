module.exports = (items, page, pageSize = 20) => {
  const totalPages = Math.ceil(items.length / pageSize);
  const results = items.slice((page - 1) * pageSize, page * pageSize);
  return { results, totalPages };
};
