const express = require('express')

const app = express()

app.get('/', (req,res)=>{
    res.send('Bem vindo a tela inicial!');
})

app.listen(3333);