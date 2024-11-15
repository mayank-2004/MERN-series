// In express.js  application, a "controller" refers to a part of your code that is responsible for handling application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send respnses abck to client.

const User = require("../models/user-model")
const bcrypt = require('bcryptjs')
const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to the mern series - accessing home page through controllers")
    } catch (error) {
        console.log(error)
    }
}

// *-------------------------------
//* User Registration Logic 📝
// *-------------------------------
// 1. Get Registration Data: 📤 Retrieve user data (username, email, password).
// 2. Check Email Existence: 📋 Check if the email is already registered.
// 3. Hash Password: 🔒 Securely hash the password.
// 4. Create User: 📝 Create a new user with hashed password.
// 5. Save to DB: 💾 Save user data to the database.
// 6. Respond: ✅ Respond with "Registration Successful" or handle errors.

const register = async (req, res) => {
    try {
        // console.log(req.body)
        const { username, email, phone, password } = req.body

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ message: "email already exists!" })
        }

        // hash the password
        // const saltround = 10
        // const hash_password = await bcrypt.hash(password,saltround)
        // console.log(hash_password)
        // const usercreated = await User.create({username, email, phone, password: hash_password})

        const usercreated = await User.create({ username, email, phone, password })

        res.status(201).json({ 
            message: 'registration successful',
            token: await usercreated.GenerateToken(),
            userId: usercreated._id.toString(), })
    } catch (error) {
        res.status(500).json({ message: "Inetrnal server error" })
    }
}

// In most cases, converting _id to a string is a good practice because it ensures consistency and compatibility across different JWT libraries and systems. It also assigns with the expectation that claims in a JWT are represented as strings.

// *-------------------------------
//* User Login Logic 📝
// *-------------------------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email })
        console.log(userExist)

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        // we can compare the password using instance method also - 
        // const user = await bcrypt.compare(password, userExist.password)
        const user = await userExist.ComparePassword(password);

        if (user) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.GenerateToken(),
                userId: userExist._id.toString(),
            })
        }else{
            res.status(400).json({
                message: "Invalid email or password",
            })
        }

    } catch (error) {
        // res.status(500).json("internal server error")
        next(error)
    }
}

const user = async (req,res) =>{
    try {
        const userData = req.user;
        console.log(userData)
        return res.status(200).json({userData})
    } catch (error) {
        console.log(`error from the user route ${error}`)
    }
}

module.exports = { home, register,login, user }