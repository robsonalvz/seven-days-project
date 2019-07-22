const express = require('express')

const router = new express.Router();
//Initializes an instance of the Router class.
//imports the user model and the BcryptJS Library
// BcryptJS is a no setup encryption tool


const UserController = require('../app/controllers/UserController')

router.post('/register', UserController.save );

router.post('/login', UserController.login);

module.exports = router