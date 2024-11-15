const { z } = require("zod")

const loginSchema = z.object({
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(5, { message: "length of email must be atleast 5 characters" })
        .max(255, { message: "length of email can not be more than 255 characters" }),
    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(8, { message: "length of password must be atleast 8 characters" })
        .max(1024, { message: "length of password can not be more than 1024 characters" }),
})

// Creating the object schema
const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(5, { message: "length of username must be atleast 5 characters" })
        .max(255, { message: "length of username can not be more than 255 characters" }),
    phone: z
        .string({ required_error: "phone number is required" })
        .trim()
        .min(10, { message: "length of phone number must be atleast 10 characters" })
        .max(20, { message: "length of phone number can not be more than 20 characters" }),
})

module.exports = {signupSchema, loginSchema}