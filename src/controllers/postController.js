const postServices = require('../services/postServices');

const postController = {
  /** @type {import('express').RequestHandler} */
  async getAll(_req, res) {
    const posts = await postServices.getAll();
    return res.status(200).json(posts);
  },

};

module.exports = postController;