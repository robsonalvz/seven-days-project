const express = require('express');
const routes = new express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
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
            if (!user) {
                return done(null, false, { message: 'Invalid credentials.\n' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Invalid credentials.\n' });
            }
            return done(null, user);
        }).catch(error => done(error));

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
        UserController.findById(id)
        .then(user => done(null,user))
        .catch(error => done(error, false))
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
        if(info) {return res.send(info.message)}
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.login(user, (err) => {
          if (err) { return next(err); }
          return res.redirect('/authrequired');
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