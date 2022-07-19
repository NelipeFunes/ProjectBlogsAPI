const { Router } = require('express');
const userController = require('../controllers/userController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const userRouter = Router();

userRouter.route('/')
  .post(userController.registerUser)
  .get(tokenMiddleware, userController.getAll);

userRouter.route('/:id')
  .get(tokenMiddleware, userController.getById);

userRouter.route('/me')
  .delete(tokenMiddleware, userController.deleteUser);

module.exports = userRouter;