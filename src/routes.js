const express = require('express');
const routes = new express.Router();


routes.get('/', (req,res)=>{
    console.log('Inside the homepage callback function');
    console.log(req.sessionID);
    res.send(`Bem vindo a tela inicial!`);
})

module.exports = routes;