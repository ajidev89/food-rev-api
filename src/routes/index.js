const express = require('express')
const { body } = require('express-validator');

const { checkAdminRole,checkUserLoggedIn } = require("../middleware/AuthMiddleware")

const router = express.Router(); 
const UserController = require("../controllers/UserController")
const BlogController = require("../controllers/BlogController")
const TagController = require("../controllers/TagController")
const CloudinaryController = require("../controllers/CloudinaryController")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

//Swagger
router.use('/api-documentation', swaggerUi.serve);
router.get('/api-documentation', swaggerUi.setup(swaggerDocument));

router.post('/login',body('email').isEmail(), UserController.login)
router.post('/admin/register',body('email').isEmail(),UserController.register)
router.post('/admin/reset-password',body('email').isEmail(),UserController.resetPassword)
router.post('/admin/change-password',body('token').isLength(24),UserController.changePassword)
router.get("/admin/blogs",checkUserLoggedIn,checkAdminRole,BlogController.getBlog)
router.post("/admin/blog/new",checkUserLoggedIn,checkAdminRole,BlogController.addBlog)
router.get("/admin/blog/:id",checkUserLoggedIn,checkAdminRole,BlogController.getsingleBlog)
router.put("/admin/blog/:id",checkUserLoggedIn,checkAdminRole,BlogController.updateBlog)
router.delete("/admin/blog/:id",checkUserLoggedIn,checkAdminRole,BlogController.deleteBlog)
router.post("/admin/tags/new",checkUserLoggedIn,checkAdminRole,TagController.createTag)
router.get("/admin/tags",checkUserLoggedIn,checkAdminRole,TagController.getTag)
router.put("/admin/tags/:id",checkUserLoggedIn,checkAdminRole,TagController.updateTag)
router.delete("/admin/tags/:id",checkUserLoggedIn,checkAdminRole,TagController.deleteTag)

//user
router.get("/blogs",BlogController.getBlog)

//Uploader
router.post("/admin/upload",checkUserLoggedIn,checkAdminRole,CloudinaryController.uploadImage)

module.exports = router