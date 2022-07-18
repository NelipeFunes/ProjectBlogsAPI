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
};

module.exports = postServices;