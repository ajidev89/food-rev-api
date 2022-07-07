const express = require('express')
const { body } = require('express-validator');

const router = express.Router(); 
const UserController = require("../controllers/UserController")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

//Swagger
router.use('/api-documentation', swaggerUi.serve);
router.get('/api-documentation', swaggerUi.setup(swaggerDocument));

router.get('/', UserController.login)
router.post('/register', body('email').isEmail() ,UserController.register)


module.exports = router