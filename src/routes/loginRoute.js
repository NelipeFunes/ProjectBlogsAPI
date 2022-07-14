const { Router } = require('express');
const controller = require('../controllers/logincontroller');

const loginRoute = Router();

loginRoute.post('/', controller.login);

module.exports = loginRoute;