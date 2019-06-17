const express = require('express')
const router = express.Router()
const Profile = require('../../models/Profile')
const auth = require('../../middleware/auth')
const {
    check,
    validationResult
} = require('express-validator/check')


//@route   GET api/profile
//@desc    Test route
//@access  Public
router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({
                user: req.user.id
            })
            .populate('user', ['name', 'avatar']) // we can get these name and avatar from User Model

        if (!profile) {
            return res.status(400).json({
                message: `There os nor profilr for this user : ${req.user.id}`
            })
        }

        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Serve is down...!!')
    }
})



//@route   POST api/profile
//@desc    Create or update user profile
//@access  Private

router.post('/me', [auth, [
    check('status', 'Status is required')
    .not()
    .isEmpty(),
    check('skills', 'Skills is required')
    .not()
    .isEmpty()
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        status,
        skills,
        company,
        location,
        bio,
        githubusername,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        website
    } = req.body

    // build the profile object

    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.webiste = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (facebook) profileFields.social.facebook = facebook
    if (twitter) profileFields.social.twitter = twitter
    if (instagram) profileFields.social.instagram = instagram

    try {

        // check if there is a profile then we update it and return profile on json format 

        let profile = await Profile.findOne({
            user: req.user.id
        })
        if (profile) {
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            })

            return res.json(profile)
        }

        // if its not found we create i and return profile on json format 

        profile = new Profile(profileFields)
        profile.save()
        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).send("server is Down....")
    }


})







module.exports = router