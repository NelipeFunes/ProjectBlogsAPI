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
    const { id } = req.user;
    const { id: userId } = req.params;
    const validate = await postServices.validateBody(req.body);
    const updated = await postServices.updatePost({ ...validate, id, userId });
    return res.status(200).json(updated);
  },

};

module.exports = postController;