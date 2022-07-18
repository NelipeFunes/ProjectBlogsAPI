const tokenUtils = require('../utils/tokenUtils');

/** @type {import('express').RequestHandler} */
module.exports = async (req, _res, next) => {
  const auth = req.headers.authorization;
  await tokenUtils.verifyToken(auth);
  next();
};