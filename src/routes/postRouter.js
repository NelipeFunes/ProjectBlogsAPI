const { Router } = require('express');
const postController = require('../controllers/postController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postRouter = Router();

postRouter.route('/').get(tokenMiddleware, postController.getAll);

module.exports = postRouter;