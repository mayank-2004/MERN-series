const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

// secure the password with the bcrypt - ek trh se hm middleware ke through password hash kr rhe h.
// During Password Hashing:  The pre middleware is defined within the userSchema before creating the User model. This ensures that the middleware is properly applied to user documents before they are saved to the database.

UserSchema.pre('save', async function (next) {
    // console.log("pre method",this)
    const user = this;

    if (!user.isModified('password')) {
        next()
    }

    try {
        const saltround = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltround)
        user.password = hash_password;
    } catch (error) {
        next(error)
    }
});

// What is JWT?

// JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

// JWTs are often used for authentication and authorization in web applications.

// Authentication: Verifying the identity of a user or client.

// Authorization: Determining what actions a user or client is allowed to perform.

// Components of a JWT:

// Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.

// Payload: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include user ID, username, and expiration time.

// Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.

// json web token - 
// Tokens, such as JWTs (JSON Web Tokens), are typically not stored in the database along with other user details. Instead, they are issued by the server during the authentication process and then stored on the client-side (e.g., in cookies or local storage) for later use.

UserSchema.methods.GenerateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            },
        )
    } catch (error) {
        console.error(error)
    }
}

UserSchema.methods.ComparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

const User = new mongoose.model("User", UserSchema)
module.exports = User