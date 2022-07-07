const express = require('express')
const { dbConnection } = require('./src/database')
const router = require('./src/routes')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const app = express()

dbConnection(app)


//MiddleWare
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
app.use(router)