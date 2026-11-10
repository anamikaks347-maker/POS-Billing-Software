const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json("Token Required")
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.staffId = decoded.staffId

        next()
    }
    catch(err){
        res.status(401).json("Invalid Token")
    }
}

module.exports = authMiddleware