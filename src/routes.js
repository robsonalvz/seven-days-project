const express = require('express');
const uuid = require('uuid/v4');
const routes = new express.Router();


routes.get('/', (req,res)=>{
    console.log(req)
    const uniqueId = uuid();
    res.send(`Bem vindo a tela inicial!: ${uniqueId}\n`);

})

module.exports = routes;