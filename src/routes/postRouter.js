const { Router } = require('express');
const postController = require('../controllers/postController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postRouter = Router();

postRouter.route('/').get(tokenMiddleware, postController.getAll);

postRouter.route('/:id').get(tokenMiddleware, postController.getById);

module.exports = postRouter;