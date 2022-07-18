const { Router } = require('express');
const controller = require('../controllers/loginController');

const appLogin = Router();

appLogin.post('/', controller.login);

module.exports = appLogin;