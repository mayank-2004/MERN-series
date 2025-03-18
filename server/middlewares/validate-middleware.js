const validate = (schema) => async(req,res,next) =>{
    try {
        const ParseBody = await schema.parseAsync(req.body) // parseAsync is a method which is used to parse the body of the request(user registering its data is parsed wiht zod schema defined) and schema is the schema (schema designed in zod) which is passed as an argument.
        req.body = ParseBody;
        next()  
    } catch (err) {
        const status = 422;
        const message = "Fill the input properly"
        const extradetails = err.errors[0].message 
        const error = {
            status,
            message,
            extradetails
        }

        console.log(error)
        next(error)
    }
}

module.exports = validate;