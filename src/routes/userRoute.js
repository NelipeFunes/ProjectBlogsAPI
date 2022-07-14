const { Router } = require('express');
const controller = require('../controllers/userController');

const userRoute = Router();

userRoute.post('/', controller.registerUser);

module.exports = userRoute;