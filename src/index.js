const express = require('express');
/** mongoose for mongodb atlas */
const mongoose = require('mongoose');
/** Cors Allow all applications types to access backend */
const cors = require('cors');
const app = express();

app.use(require('./routes'));
app.use(cors());
app.listen(3333);

