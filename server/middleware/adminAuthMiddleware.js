const jwt = require('jsonwebtoken')

const adminAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json('Token Required')
    }

    try {
        const decoded = jwt.verify(
            token.replace('Bearer ', ''),
            process.env.JWT_SECRET
        )

        if (decoded.role !== 'admin') {
            return res.status(403).json('Admin Access Only')
        }

        req.admin = decoded
        next()

    } catch (err) {
        res.status(401).json('Invalid Token')
    }
}

module.exports = adminAuthMiddleware