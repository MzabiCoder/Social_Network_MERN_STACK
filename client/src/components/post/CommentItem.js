import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {delComment} from '../../action/post'


const CommentItem = ({auth,delComment,postId,
    comment:{_id,text,name,avatar,user,date}
    }) => {
    return (
        <Fragment>
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
            possimus corporis sunt necessitatibus! Minus nesciunt soluta
            suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
            dolor? Illo perferendis eveniet cum cupiditate aliquam?
          </p>
           <p className="post-date">
              Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
              <button onClick={e=>delComment(postId,_id)} type="button" className="btn btn-danger" >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
        </Fragment>
    )
}

CommentItem.propTypes = {
postId:PropTypes.number.isRequired,
comment:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
delComment:PropTypes.func.isRequired
}

const map=state=>({
    auth:state.auth
})

export default connect(map,{delComment})(CommentItem)
