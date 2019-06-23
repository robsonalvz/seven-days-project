const express = require('express');
const routes = new express.Router();
const passport = require('passport');
const cp = require('cookie-parser');

require('dotenv').config(); 

require('../../passport-config')(passport)

routes.use(cp());

routes.use(passport.initialize());

routes.get('/', passport.authenticate('jwt', {session: false}), (req,res)=>{
    res.send(`Bem vindo a tela inicial!`);
});

module.exports = routes;