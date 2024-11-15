// In express.js, express.Router() is a mini express application without all the server configurations but with the ability to define routes,middleware and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organized and maintainable.

const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controller")
const {signupSchema, loginSchema} = require("../validators/auth-validator")
const validate = require("../middlewares/validate-middleware")
const authMiddleware = require("../middlewares/auth-middleware")

// router.get("/", (req, res) => {
//     res.status(200).send("Welcome to the mern series - accessing home page using Router")
// }) 
// we can use this route method also for get request. In this, we can concatenate other http requests too like post,patch,etc.
router.route("/").get(authControllers.home)

router.route("/register").post( validate(signupSchema), authControllers.register)

router.route("/login").post(validate(loginSchema), authControllers.login)

router.route("/user").get(authMiddleware, authControllers.user)

module.exports = router