const express = require('express')
const router = express.Router()
const config = require('config')
const gravatar = require('gravatar')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
    check,
    validationResult
} = require('express-validator/check')

const User = require('../../models/User')


//@route   POST api/users
// Register user 
// Private
router.post('/', [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more character').isLength({
        min: 6
    })

], async (req, res) => {
    // Handling errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }


    const {
        name,
        email,
        password
    } = req.body

    try {
        //registering a user , first see if the user exists

        let user = await User.findOne({
            email
        })
        if (user) {

            // always put return if its not the last res.json or res.send  !!
            return res.status(400).json({
                errors: [{
                    msg: 'User already exists...!!!'
                }]
            })
        }

        // get user gravatar

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        //encrypt password and anything that return promise we need to put await in front of it
        const salt = await bycrypt.genSalt(10)
        user.password = await bycrypt.hash(password, salt)
        await user.save()


        // setup JWT (return jsonwebtoken and this because on the react i want the user to login immediately thats why the user has to have that token)

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
        res.status(500).send('Server error')
    }




})













module.exports = router