const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const config = require('config')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
    check,
    validationResult
} = require('express-validator/check')


//@route   GET api/auth
//@desc    Test route
//@access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("server Error")
    }
})



//@route   POST api/auth
//@desc    authenticate user and get token
//@access  Public

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'PAssword is required').exists()
], async (req, res) => {
    // Handling errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }


    const {
        email,
        password
    } = req.body

    try {
        //registering a user , first see if the user exists

        let user = await User.findOne({
            email
        })
        if (!user) {

            // always put return if its not the last res.json or res.send  !!
            return res
                .status(400)
                .json({
                    errors: [{
                        msg: 'Invalid credential'
                    }]
                })
        }

        const isMatch = await bycrypt.compare(password, user.password)

        // password is the plain which entred by the user and user.password is the one in the database
        if (!isMatch) {
            // always put return if its not the last res.json or res.send  !!
            return res
                .status(400)
                .json({
                    errors: [{
                        msg: 'Invalid Credentials'
                    }]
                })
        }

        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(
            payload,
            config.get('jwtsecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err
                res.json({
                    token
                })
            }
        )


        // res.send('User Registered')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server is....')
    }




})










module.exports = router