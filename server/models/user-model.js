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

// methods ek function h jiski help se hm koi bhi funtion bna skte h. hm in functions ko kisi bhi page ya component me access kr skte h.
// GenerateToken:  The GenerateToken method is defined on the UserSchema. This method generates a JWT token for the user. The token is generated using the jwt.sign method, which takes the user ID and email as the payload, the JWT_SECRET_KEY as the secret key, and an expiration time of 30 days.

// ComparePassword:  The ComparePassword method is defined on the UserSchema. This method compares the user's password with the password provided as an argument. It uses the bcrypt.compare method to compare the two passwords and returns a boolean value indicating whether they match.

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