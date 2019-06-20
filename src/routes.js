const express = require('express');

const routes = new express.Router();


routes.get('/', (req,res)=>{
    res.send('Bem vindo a tela inicial!');
})

module.exports = routes;