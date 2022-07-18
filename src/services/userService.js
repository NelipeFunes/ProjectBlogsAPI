const Joi = require('joi');
const models = require('../database/models');

const userServices = {
  async validateRegister(obj) {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      image: Joi.string(),
    });
    const result = schema.validate(obj);
    if (result.error) {
      const error = new Error(result.error.message);
      error.status = 400;
      throw error;
    }
    return result.value;
  },

  async createUser({ email, password, image, displayName }) {
    const registred = await models.User.findOne({
      where: { email, password }, 
      raw: true,
    });
    if (registred) {
      const error = new Error('User already registered');
      error.status = 409;
      throw error;
    }

    await models.User.create({ displayName, email, password, image }, { raw: true });
    return { displayName, email, password, image };
  },

  async getAll() {
    const users = await models.User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },
};

module.exports = userServices;