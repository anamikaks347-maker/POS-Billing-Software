const jwt = require('jsonwebtoken')

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(
                { role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )

            return res.status(200).json({
                message: 'Admin Login Successful',
                token
            })
        }

        res.status(401).json('Invalid Email or Password')

    } catch (err) {
        res.status(500).json(err.message)
    }
}