const Joi = require('joi');
const jwt = require('jsonwebtoken');

const models = require('../database/models');

const services = {
  makeToken(obj) {
    const data = { data: obj };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return token;
  },
  async validateLogin(obj) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(5),
    });
    const result = schema.validate(obj);
    if (result.error) {
      const error = new Error('Some required fields are missing');
      error.status = 400;
      throw error;
    } 
      return result.value;
  },

  async getUser({ email }) {
    const user = await models.User.findOne({
      where: { email },
      raw: true,
    });
    if (!user) {
      const error = new Error('Invalid fields');
      error.status = 400;
      throw error;
    }
    return user;
  },
};

module.exports = services;