const express = require('express');
/** mongoose for mongodb atlas */
const mongoose = require('mongoose');
/** Cors Allow all applications types to access backend */
const cors = require('cors');
const session = require('express-session');
const uuid = require('uuid/v4');
const FileStore = require('session-file-store')(session);

const app = express();

app.use(session({
    genid:(req)=>{
        console.log('Inside the session on the middleware')
        console.log(req.sessionID)
        return uuid() // return UUIDs for session IDs
    },
    store:new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized:true,
}))
app.use(require('./routes'));

app.use(cors());
app.listen(3333,()=>{
    console.log('Listening on 3333');
});

