const express = require('express');
const routes = new express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserController = require('./controllers/UserController')
//const users = [{ id: '242424', email: 'test@test.com', password: 'password'}]

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
        console.log('Inside local strategy callback')
        UserController.findByEmail(email)
        .then(user => {
            if (email == user.email && password == user.password ){
                console.log('Local strategy return true')
                return done(null,user)
            }
        });

    }
    ));
    
    // tell passport how to serialize the user
    passport.serializeUser((user, done)=>{
        console.log('Inside serializeUser callback. User id is save the session file store');
        done(null,user.id);
    });
    
    passport.deserializeUser((id, done) => {
        console.log('Inside deserializeUser callback')
        console.log(`The user id passport saved in the session file store is: ${id}`)
        const user = users[0].id === id ? users[0] : false; 
        done(null, user);
    });
    
    routes.use(passport.initialize());
    routes.use(passport.session());
    


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

routes.post('/login', (req,res, next)=>{
    console.log('Inside POST/ login callback function');
    passport.authenticate('local', (err, user, info)=>{
      
        req.login(user, (err)=>{
          
            return res.send('You were authenticated & logged in!\n');
        })
    })(req, res, next);
});

routes.get('/authrequired', (req, res) => {
    console.log('Inside GET /authrequired callback')
    console.log(`User authenticated? ${req.isAuthenticated()}`)
    if(req.isAuthenticated()) {
      res.send('you hit the authentication endpoint\n')
    } else {
      res.redirect('/')
    }
  })


routes.post('/create', UserController.save);


module.exports = routes;