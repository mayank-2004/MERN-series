require('dotenv').config()
const express = require("express")
const authRoute = require("./router/auth-router")
const serviceRoute = require("./router/service-route")
const adminRoute = require("./router/admin-route")
const cors = require("cors")
const connectDB = require("./utils/db")
const errormiddleware = require('./middlewares/error-middleware')
const contactRoute = require("./router/contact-route")

const app = express()

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "POST, GET, PUT, DELETE, PATCH",
    credentials: true
}
app.use(cors(corsOptions))

// This line of code adds express middleware that parses incoming request bodies with json payloads. Its imporatnt to place this before any routes that need to handle json data in the request body. This middleware is responsisble for parsing JSON data from requests, and it should be applied at the beginning of the middleware stack to ensure it's available for all subsequent route handlers.
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/form",contactRoute)
app.use("/api/data",serviceRoute)

// admin panel route
app.use("/api/admin",adminRoute)

app.use(errormiddleware)

const PORT = 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port : ${PORT}`)
    })
})