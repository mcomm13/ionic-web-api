const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.load();

// API file for interacting with MongoDB
const api = require('./routes/api');

// Parsers
app.use(bodyParser.json());

// API location
app.use('/api', api);

//Set Port
const port = process.env.PORT || '8080';
app.set('port', port);

app.listen(port, () => console.log(`Running on localhost:${port}`));
