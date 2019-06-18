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

router.post('/', [auth, [
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
    if (website) profileFields.website = website
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
    if (linkedin) profileFields.social.linkedin = linkedin


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



//@route   GET api/profiles
//@desc    Test route
//@access  Public


router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server is down...')
    }
})

// // get profile ny user id 
//@route   GET api/profiles/user/:user id
//@desc    get profile by user id 
//@access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({
                message: "Profil not found"
            })
        }

        res.json(profile)

    } catch (err) {
        console.log(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                message: 'Profile not found'
            })
        }
        res.status(500).send('Server is down...')
    }
})



//@route   DEL api/profile
//@desc    Del profile,user & post
//@access  Public
router.delete('/', auth, async (req, res) => {

    // remove profile
    try {

        await Profile.findOneAndRemove({
            user: req.user.id
        })
        await User.findOneAndRemove({
            _id: req.user.id
        })
        res.json({
            message: 'User deleted'
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Down....')
    }
})

//@route   PUT api/profile
//@desc    Add experience
//@access  Private

router.put('/experience', [auth, [
    check('title', 'Title is required')
    .not()
    .isEmpty(),
    check('company', 'Company is required')
    .not()
    .isEmpty(),
    check('from', 'From Date is required')
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
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        // fetch the profile first
        const profile = await Profile.findOne({
            user: req.user.id
        })

        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server is down')
    }
})

//@route del api / profile
//@desc del experience
//@access  Private
router.delete('/experience/:id', auth, async (req, res) => {

    // remove experience
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        // get and remove the index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.id)


        profile.experience.splice(removeIndex, 1)
        await profile.save()

        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Down....')
    }
})


// //@route   PUT api/profile
// //@desc    Add education
// //@access  Private

router.put('/education', [auth, [
    check('school', 'Eschool is required')
    .not()
    .isEmpty(),
    check('degree', 'Degree is required')
    .not()
    .isEmpty(),
    check('from', 'From Date is required')
    .not()
    .isEmpty(),

    check('fieldofstudy', 'Fieldofstudy  is required')
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
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        // fetch the profile first
        const profile = await Profile.findOne({
            user: req.user.id
        })

        profile.education.unshift(newEdu)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server is down')
    }
})


//@route   del api/profile
//@desc    del education
//@access  Private
router.delete('/education/:id', auth, async (req, res) => {

    // remove experience
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        // get and remove the index
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.id)


        profile.education.splice(removeIndex, 1)
        await profile.save()

        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Down....')
    }
})




module.exports = router