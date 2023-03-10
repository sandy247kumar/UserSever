const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
// const config = require('../../config');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  res.status(err.status);
  res.json(response);
  res.end();
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
// Error-handling middleware always takes four arguments
exports.converter = (err, req, res, next) => {
  let error;
  if (!(err instanceof APIError)) {
    error = new APIError({
      message: err.message,
      status: err.status,
      isPublic: err.isPublic,
      stack: err.stack,
    });
  }

  return handler(error || err, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
