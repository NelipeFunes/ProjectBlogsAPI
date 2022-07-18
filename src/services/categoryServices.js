const Joi = require('joi');
const models = require('../database/models');

const categoryServices = {
  async validateCategory(obj) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const result = schema.validate(obj);
    if (result.error) {
      const error = new Error(result.error.message);
      error.status = 400;
      throw error;
    }
    return result.value;
  },

  async createCategory({ name }) {
    await models.Category.create({ name });
    const category = models.Category.findOne({ where: { name } });
    return category;
  },
};

module.exports = categoryServices;