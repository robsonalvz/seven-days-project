const express = require('express');
const routes = new express.Router();


routes.get('/', (req,res)=>{
    console.log('Inside the homepage callback function');
    console.log(req.sessionID);
    res.send(`Bem vindo a tela inicial!`);
});

routes.get('/login', (req,res)=>{
    console.log('Inside GET/ login callback function');
    console.log(req.sessionID);
    res.send('You got the login page\n')
});

routes.post('/login', (req,res)=>{
    console.log('Inside POST/ login callback function');
    console.log(req.body);
    res.send('You posted the login page\n')
});

module.exports = routes;