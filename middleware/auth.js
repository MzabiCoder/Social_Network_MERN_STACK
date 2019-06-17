const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {

    // Get the token fron the header
    const token = req.header('x-auth-token')
    // Check if there is no token
    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied'
        })
    }

    // verify token

    try {
        // decode the token
        const decode = jwt.verify(token, config.get('jwtsecret'))
        // assign req.user to decode.user cause decode has the user in the payload via id 
        req.user = decode.user
        next()
    } catch (err) {
        res.status(404).json({
            message: 'Token is not Valid'
        })
    }
}