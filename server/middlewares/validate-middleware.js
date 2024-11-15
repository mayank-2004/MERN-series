const validate = (schema) => async(req,res,next) =>{
    try {
        const ParseBody = await schema.parseAsync(req.body)
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