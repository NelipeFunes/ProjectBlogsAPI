const Joi = require('joi');
const models = require('../database/models');

const postServices = {
  async validateBody(obj) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
    });
    const result = schema.validate(obj);
    if (result.error) {
      const error = new Error('Some required fields are missing');
      error.status = 400;
      throw error;
    }
    return result.value;
  },

  async getAll() {
    const posts = await models.BlogPost.findAll({
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: models.Category, as: 'categories' },
      ],
    });
    return posts;
  },

  async getById(id) {
    const post = await models.BlogPost.findOne({
      where: { id },
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: models.Category, as: 'categories' },

      ],
    });
    if (!post) {
      const error = new Error('Post does not exist');
      error.status = 404;
      throw error;
    }
    return post;
  },

  async updatePost({ id, userId, title, content }) {
    if (Number(id) !== Number(userId)) {
      const error = new Error('Unauthorized user');
      error.status = 401;
      throw error;
    }
    await models.BlogPost.update({ title, content, updated: new Date() }, {
      where: { id },
      raw: true,
    });
    return this.getById(id);
  },
};

module.exports = postServices;