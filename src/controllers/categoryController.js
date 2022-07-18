const categoryServices = require('../services/categoryServices');

const categoryController = {
  /** @type {import('express').RequestHandler} */
  async registerCategory(req, res) {
    const validate = await categoryServices.validateCategory(req.body);
    const category = await categoryServices.createCategory(validate);
    return res.status(201).json(category);
  },
};

module.exports = categoryController;