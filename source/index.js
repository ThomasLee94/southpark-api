// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
require('../bin/db/southpark-db');
const mongoose = require('mongoose');

const app = require('./config/express');

mongoose.Promise = Promise;

//  eslint-disable-next-line
app.listen(process.env.port, () => console.log(`server up and running on port ${process.env.port}`))

module.export = app;