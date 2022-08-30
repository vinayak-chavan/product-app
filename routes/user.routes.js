const express = require("express");

const { login, register } = require('../controllers/user/userController');
const userValidation = require("../controllers/user/userValidator");

const route = express.Router();

route.post('/register', userValidation, register);
route.post('/login', login);

module.exports = route;