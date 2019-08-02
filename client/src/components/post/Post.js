import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPost} from '../../action/post'
import Spinner from '../layouts/Spinner'
import PostItem from '../posts/PostItem'
import {Link} from 'react-router-dom'
import CommentForm from './CommentForm'


const Post = ({getPost,post:{post,loading},match}) => {
    useEffect(()=>{
        getPost(match.params.id)
    },[getPost])
    return loading || post === null ? <Spinner/>:(
        <Fragment>
        <Link to="/posts" className="btn btn-primary">Go Back</Link>
        <PostItem post={post} showAction={true}/>
        <CommentForm postId={post._id}/>
        </Fragment>
    )
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}

const map=state=>({
    post:state.post
})
export default connect(map,{getPost})(Post)
