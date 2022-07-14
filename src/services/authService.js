const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'Arara Azul';

const auth = {
  async makeToken(payload) {
    const token = jwt.sign({ data: payload }, secret);
    return token;
  },
};

module.exports = auth;