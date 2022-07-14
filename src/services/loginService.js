const model = require('../database/models');
const auth = require('./authService');

const service = {
  async login(email, password) {
    if (!email || !password) {
      return 'Missing';
    }
    const data = await model.User.findOne({ where: { email, password } });
    if (!data) {
      return 'NotFound';
    }
    const token = auth.makeToken(data);
    return token;
  },
};

module.exports = service;