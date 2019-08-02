const express = require('express')
const router = express.Router()
const {
    check,
    validationResult
} = require('express-validator/check')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')




//@route   GET api/post/:id
//@desc    Get Post by id
//@access  Private
router.get('/:id', auth, async (req, res) => {



    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                message: `There is for this user : ${req.user.name}`
            })
        }


        res.json(post)

    } catch (err) {
        console.log(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(404).json({
                message: `There is for this user : ${req.user.name}`
            })
        }
        res.status(500).send('Serve is down...!!')
    }
})



//@route   Del api/post/:id
//@desc    delete Post by id
//@access  Private
router.delete('/:id', auth, async (req, res) => {



    try {
        const post = await Post.findById(req.params.id)
        // check if the user exists
        if (!post) {
            return res.status(404).json({
                message: 'Post not found!!!'
            })
        }
        // check on the user
        if (post.user.toString() !== req.user.id) {
            res.status(401).json({
                message: 'user not authorized'
            })
        }

        await post.remove()

        res.json({
            message: 'Post Removed'
        })

        res.json(post)

    } catch (err) {
        console.log(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(404).json({
                message: 'Post not found!!!'
            })
        }
        res.status(500).send('Serve is down...!!')
    }
})

//@route   GET api/posts
//@desc    Get Post
//@access  Private
router.get('/', auth, async (req, res) => {



    try {

        const posts = await Post.find().sort({
            date: -1
        })
        res.json(posts)
        // res.json(post)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})





//@route   POST api/posts
//@desc    Create Post
//@access  Private
router.post('/', [auth,
    [
        check('text', "TExt is required")
        .not()
        .isEmpty()


    ]

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        // we can get the user id through the token and it puts it inside of req.user.id
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            // these infor come from user
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,

        })

        const post = await newPost.save()
        res.json(post)


    } catch (err) {
        res.status(500).send('Server Error')
    }
})





//@route   PUT api/posts/like/:id
//@desc    Like a Post
//@access  Private

router.put('/unlike/:id', auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)

        // check if the post has already been liked

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
                message: 'Post has not yet been liked '
            })
        }
        const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id))

        post.likes.splice(removeIndex, 1)

        await post.save()

        res.json(post.likes)

    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(404).json({
                message: 'Post not found!!!'
            })
        }
        res.status(500).send('Server Error')
    }
})



//@route   PUT api/posts/like/:id
//@desc    Like a Post
//@access  Private

router.put('/like/:id', auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)

        // check if the post has already been liked

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
                message: 'Post Already liked'
            })
        }
        post.likes.unshift({
            user: req.user.id
        })

        await post.save()

        res.json(post.likes)

    } catch (err) {
        console.error(err.message)
        // if (err.kind == 'ObjectId') {
        //     return res.status(404).json({
        //         message: 'Post not found!!!'
        //     })
        // }
        res.status(500).send('Server Error')
    }
})


//@route   POST api/posts/comments
//@desc    Create comment
//@access  Private
router.post('/comment/:id', [auth,
    [
        check('text', "Text is required")
        .not()
        .isEmpty()

    ]

], async (req, res) => {
    const errors = validationResult(req)


    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        // we can get the user id through the token and it puts it inside of req.user.id
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)

        // comment its not a collection in the database thats why we simply constrat a simple object to embed data into it
        const newComent = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,

        }

        post.comments.unshift(newComent)

        await post.save()
        res.json(post.comments)


    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(404).json({
                message: 'Likes not found!!!'
            })
        }
        res.status(500).send('Server Error')
    }
})


//@route   DELETE api/posts/comments
//@desc    Delete comment
//@access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)
        // pull out the comment from the post

        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        if (!comment) {
            return res.status(404).json({
                message: 'comment not found !!'
            })
        }
        // check the user 
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'User not authorized'
            })
        }

        const removeIndex = post.comments.map(comment => comment.user.toString().indexOf(req.user.id))

        post.comments.splice(removeIndex, 1)
        await post.save()

        res.json(post.comments)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})








module.exports = router