import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getProfileByid} from '../../action/profile'

const Profile = ({match,getProfileByid,profile:{profile,loading},auth}) => {
    useEffect(()=>{
        getProfileByid(match.params.id) 
    },[])
    return (
        <Fragment>
         {profile === null || loading ? <Spinner/> : <Fragment>
            
            profile
            
            </Fragment> }
        </Fragment>
    )
}

Profile.propTypes = {
profile:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
getProfileByid:PropTypes.func.isRequired
}

const map=state=>({
    auth:state.auth,
    profile:state.profile,

})

export default connect(map,{getProfileByid})(Profile)
