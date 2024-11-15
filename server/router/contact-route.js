const express = require("express")
const router = express.Router()
const ContactForm = require("../controllers/Contact-controller")

router.route("/contact").post(ContactForm)

module.exports = router