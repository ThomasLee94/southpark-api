// MIDDLEWARE IMPORTS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const checkAuthentication = require('./middleware/checkAuthentication');

// ROUTE IMPORT
const routes = require('./index.routes');

// SETTING DB AND MONGOOSE CONNECTION
require('../bin/db/southpark-db');

// INSTANCE OF EXPRESS
const server = express();

//  REQ/RES MIDDLEWARE
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());

// CUSTOME MIDDLEWARE
server.use(checkAuthentication);

// MOUNTING ROUTES TO API PATH
server.use('/api', routes);

// PORT
const port = process.env.PORT;
server.listen(port, () => console.log(`server up and running on port ${port}`));

module.exports = server; 
