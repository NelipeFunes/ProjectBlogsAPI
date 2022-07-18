const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const categoryRouter = Router();

categoryRouter.route('/')
  .post(tokenMiddleware, categoryController.registerCategory)
  .get(tokenMiddleware, categoryController.getAll);

module.exports = categoryRouter;