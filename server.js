const express = require('express')
const { dbConnection } = require('./src/database');
const router = require('./src/routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const fileUpload = require("express-fileupload");
const cors = require('cors');
dbConnection(app)
app.use(
    fileUpload({
      useTempFiles: true
    })
);
app.use(cors({
  origin:"*"
}));

//register a view engine 
app.set('view engine','ejs');
app.set("views" , "src/views")

//MiddleWare
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
app.use(router)