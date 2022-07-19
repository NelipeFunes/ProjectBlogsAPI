const postServices = require('../services/postServices');

const postController = {
  /** @type {import('express').RequestHandler} */
  async getAll(_req, res) {
    const posts = await postServices.getAll();
    return res.status(200).json(posts);
  },

  /** @type {import('express').RequestHandler} */
  async getById(req, res) {
    const { id } = req.params;
    const post = await postServices.getById(id);
    return res.status(200).json(post);
  },

    /** @type {import('express').RequestHandler} */
  async updatePost(req, res) {
    const { id: userId } = req.user;
    const { id } = req.params;
    const validate = await postServices.validateBody(req.body);
    const updated = await postServices.updatePost({ ...validate, id, userId });
    return res.status(200).json(updated);
  },

  /** @type {import('express').RequestHandler} */
  async deletePost(req, res) {
    const { id: userId } = req.user;
    const { id } = req.params;
    await postServices.deletePost(id, userId);
    return res.status(204).end();
  },

  async registerPost(req, res) {
    const { id } = req.user;
    const validate = await postServices.validateBodyWithCategories(req.body);
    await postServices.validateCategory(req.body.categoryIds);
    const register = await postServices.registerPost({ ...validate, id });
    return res.status(201).json(register);
  },

};

module.exports = postController;