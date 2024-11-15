// isme basically bs itna hua h ki jo user login h vo admin h ya nhi, yh check krre h. agr admin h to vo sare user ki details check kr skta h vnra nhi.
const adminMiddleware = async(req, res, next) =>{
    try {
        // console.log(req.user)
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message : "Access denied. User is not an admin."})
        }
        // res.status(200).json({msg: req.user.isAdmin})
        // If user is an admin then proceed to next middleware.
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = adminMiddleware