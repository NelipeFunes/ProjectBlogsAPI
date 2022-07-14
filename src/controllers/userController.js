const services = require('../services/userServices');

const controller = {
  /** @type {import('express').RequestHandler} */
  async registerUser(req, res) {
    const { displayName, email, password, image } = req.body;
    const result = await services.register(displayName, email, password, image);
    switch (result) {
      case 'dis length':
        return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' });
      case 'invalid email':
        return res.status(400).json({ message: '"email" must be a valid email' });
      case 'pass length':
        return res.status(400)
        .json({ message: '"password" length must be at least 6 characters long' });
      case 'user exists':
        return res.status(409).json({ message: 'User already registered' });
      default:
        return res.status(201).json({ token: result });
    }
  },

};

module.exports = controller;