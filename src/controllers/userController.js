const userServices = require('../services/userService');
const tokenUtils = require('../utils/tokenUtils');

const userController = {
  /** @type {import('express').RequestHandler} */
  async registerUser(req, res) {
    const validateJoi = await userServices.validateRegister(req.body);
    const created = await userServices.createUser(validateJoi);
    const token = tokenUtils.makeToken(created);
    return res.status(201).json({ token });
  },

  /** @type {import('express').RequestHandler} */
  async getAll(_req, res) {
    const users = await userServices.getAll();
    res.status(200).json(users);
  },

 /** @type {import('express').RequestHandler} */
  async getById(req, res) {
    const { id } = req.params;
    const user = await userServices.getById(id);
    return res.status(200).json(user);
  },
};

module.exports = userController;