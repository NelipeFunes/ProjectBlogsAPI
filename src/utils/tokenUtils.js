const Joi = require('joi');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const tokenUtils = {
  makeToken(obj) {
    const data = { data: obj };
    const token = jwt.sign(data, secret);
    return token;
  },
  async verifyToken(token) {
    const schema = Joi.string().required();
    const result = schema.validate(token);
    if (result.error) {
      const error = new Error('Token not found');
      error.status = 401;
      throw error;
    }
    const { data } = jwt.verify(token, secret);
    return data;
  },

  async decodeToken(token) {
    const { data } = jwt.decode(token, secret);
    return data;
  },
};

module.exports = tokenUtils;