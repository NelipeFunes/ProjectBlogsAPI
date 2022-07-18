const models = require('../database/models');

const postServices = {
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
};

module.exports = postServices;