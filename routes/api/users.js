const express = require('express')
const router = express.Router()
const gravata = require('gravatar')
const {
    check,
    validationResult
} = require('express-validator/check')

const User = require('../../models/User')


//@route   POST api/users
//@desc    Register User
//@access  Public
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
            res.status(400).json({
                errors: [{
                    msg: 'User already exists...!!!'
                }]
            })
        }

        // get user gravatar

        const gravata = gravatar.url(email, {
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

        //encrypt password


        // return jsonwebtoken and this because on the react i want the user to login immediately(thats why the user has to have that token)
        res.send('User Route')
    } catch (err) {
        console.log(err)
        //  res.status(500).send('Server is....')
    }




})













module.exports = router