const { Router } = require('express');
const userController = require('../controllers/userController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const userRouter = Router();

userRouter.route('/')
  .post(userController.registerUser)
  .get(tokenMiddleware, userController.getAll);

module.exports = userRouter;