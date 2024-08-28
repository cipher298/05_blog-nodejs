module.exports = function SortMiddleware(req, res, next) {
  res.locals._sort = {
    enabled: false,
    type: 'default',
  };

  if (req.query.hasOwnProperty('_sort')) {
    // req.locals._sort.enabled = true;
    // req.locals._sort.column = req.query.column;
    // req.locals._sort.type = req.query.type;

    Object.assign(res.locals._sort, {
      enabled: true,
      column: req.query.column,
      type: req.query.type,
    });
  }

  next();
};
