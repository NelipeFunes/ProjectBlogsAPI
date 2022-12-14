const { Router } = require('express');
const postController = require('../controllers/postController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postRouter = Router();

postRouter.route('/search').get(tokenMiddleware, postController.queryPost);
postRouter.route('/')
  .get(tokenMiddleware, postController.getAll)
  .post(tokenMiddleware, postController.registerPost);

postRouter.route('/:id')
  .get(tokenMiddleware, postController.getById)
  .delete(tokenMiddleware, postController.deletePost)
  .put(tokenMiddleware, postController.updatePost);

module.exports = postRouter;