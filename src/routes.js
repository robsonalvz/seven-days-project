const express = require('express');
const routes = new express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');

const users = [{ id: '242424', email: 'test@test.com', password: 'password'}]

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
        console.log('Inside local strategy callback')
        // here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was users[0]
    const user = users[0] 
    if (email == user.email && password == user.password ){
        console.log('Local strategy return true')
        return done(null,user)
    }
    }
));

// tell passport how to serialize the user
passport.serializeUser((user, done)=>{
    console.log('Inside serializeUser callback. User id is save the session file store');
    done(null,user.id);
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
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        req.login(user, (err)=>{
            console.log('Inside req.login() callback')
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
            console.log(`req.user: ${JSON.stringify(req.user)}`)
            return res.send('You were authenticated & logged in!\n');
        })
    })(req, res, next);
});

module.exports = routes;