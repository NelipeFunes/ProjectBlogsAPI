const tokenUtils = require('../utils/tokenUtils');

/** @type {import('express').RequestHandler} */
module.exports = async (req, _res, next) => {
  const auth = req.headers.authorization;
  const valid = await tokenUtils.verifyToken(auth);
  req.user = valid;
  next();
};