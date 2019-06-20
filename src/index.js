const express = require('express');
/** mongoose for mongodb atlas */
const mongoose = require('mongoose');
/** Cors Allow all applications types to access backend */
const cors = require('cors');
const app = express();


app.use(cors());


app.get('/', (req,res)=>{
    res.send('Bem vindo a tela inicial!');
})

app.listen(3333);