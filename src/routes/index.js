const express = require('express')
const { body } = require('express-validator');

const { checkUserLoggedIn } = require("../middleware/AuthMiddleware")

const router = express.Router(); 
const UserController = require("../controllers/UserController")
const BlogController = require("../controllers/BlogController")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

//Swagger
router.use('/api-documentation', swaggerUi.serve);
router.get('/api-documentation', swaggerUi.setup(swaggerDocument));

router.post('/login',body('email').isEmail(), UserController.login)
router.post('/register',body('email').isEmail(),UserController.register)

router.get("/admin/blogs",checkUserLoggedIn,BlogController.getBlog)


module.exports = router