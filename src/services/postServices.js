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

  async validateBodyWithCategories(obj) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required(),
    });
    const result = schema.validate(obj);
    if (result.error) {
      const error = new Error('Some required fields are missing');
      error.status = 400;
      throw error;
    }
    return result.value;
  },

  async validateCategory(arr) {
    const exists = await Promise.all(
      arr.map((ele) => models.Category.findOne({ where: { id: ele } })),
      );
    
    if (!exists.every((ele) => ele)) {
      const error = new Error('"categoryIds" not found');
      error.status = 400;
      throw error;
    }
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
    return this.getById(userId);
  },

  async deletePost(id, userId) {
    const post = await models.BlogPost.findOne({ where: { id }, raw: true });
    if (!post) {
      const error = new Error('Post does not exist');
      error.status = 404;
      throw error;
    }
    if (post.userId !== userId) {
      const error = new Error('Unauthorized user');
      error.status = 401;
      throw error;
    }
    await models.PostCategory.destroy({ where: { postId: id } });
    await models.BlogPost.destroy({ where: { id } });
    return post;
  },

  async registerPost({ title, content, id, categoryIds }) {
    let published = new Date();
    let updated = new Date();
    await models.BlogPost.create({
      title, content, userId: id, published, updated,
    }, 
    { raw: true });
    const post = await models.BlogPost.findOne({ where: { title }, raw: true });

    await Promise.all(
      categoryIds.map((ele) => models.PostCategory.create({
        postId: post.id,
        categoryId: ele,
      })),
    );
    published = post.published;
    updated = post.updated;
    return { id: post.id, userId: id, title, content, published, updated };
  },
};

module.exports = postServices;