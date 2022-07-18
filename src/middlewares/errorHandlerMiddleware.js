/** @type {import('express').ErrorRequestHandler} */
const errorHandlerMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
};

module.exports = errorHandlerMiddleware;