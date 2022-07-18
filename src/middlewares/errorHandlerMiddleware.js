/** @type {import('express').ErrorRequestHandler} */
const errorHandlerMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  return res.status(500).json({ message: err.message });
};

module.exports = errorHandlerMiddleware;