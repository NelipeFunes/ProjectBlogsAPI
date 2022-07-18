const categoryServices = require('../services/categoryServices');

const categoryController = {
  /** @type {import('express').RequestHandler} */
  async registerCategory(req, res) {
    const validate = await categoryServices.validateCategory(req.body);
    const category = await categoryServices.createCategory(validate);
    return res.status(201).json(category);
  },

  async getAll(_req, res) {
    const categories = await categoryServices.getAll();
    return res.status(200).json(categories);
  },
};

module.exports = categoryController;