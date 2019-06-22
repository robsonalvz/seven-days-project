const express = require('express');
/** mongoose for mongodb atlas */
const mongoose = require('mongoose');
/** Cors Allow all applications types to access backend */
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://sisalfa:sisalfa@cluster0-oq7yn.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
})

mongoose.set('useCreateIndex', true);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(require('./routes/routes'));
app.use(require('./routes/user'));
//registers our authentication routes with Express.
app.use(cors());
app.listen(process.env.PORT || 3333,()=>{
    console.log('Listening on 3333');
});

