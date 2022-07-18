const loginServices = require('../services/loginService');
const userServices = require('../services/userService');

const userController = {
  /** @type {import('express').RequestHandler} */
  async registerUser(req, res) {
    const validateJoi = await userServices.validateRegister(req.body);
    const created = await userServices.createUser(validateJoi);
    const token = loginServices.makeToken(created);
    return res.status(201).json({ token });
  },
};

module.exports = userController;