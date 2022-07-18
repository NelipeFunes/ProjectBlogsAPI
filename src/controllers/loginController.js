const services = require('../services/loginService');
const tokenUtils = require('../utils/tokenUtils');

const controller = {
  /** @type {import('express').RequestHandler} */
  async login(req, res) {
    const data = await services.validateLogin(req.body);
    const login = await services.getUser(data);
    const token = tokenUtils.makeToken(login);
    return res.status(200).json({ token });
  }, 
};

module.exports = controller;