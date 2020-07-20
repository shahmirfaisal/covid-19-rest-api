module.exports = (next, message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode || 500;
  next(error);
};
