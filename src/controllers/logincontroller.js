const loginService = require('../services/loginService');

const controller = {
  /** @type {import('express').RequestHandler} */
  async login(req, res) {
    const { email, password } = req.body;
    const result = await loginService.login(email, password);
    switch (result) {
      case 'Missing':
        return res.status(400).json({ message: 'Some required fields are missing' });
      case 'NotFound':
        return res.status(400).json({ message: 'Invalid fields' });
      default:
        return res.status(200).json({ token: result });
    }
  },

};

module.exports = controller;