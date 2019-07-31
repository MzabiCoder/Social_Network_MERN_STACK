import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getProfileByid} from '../../action/profile'
import {Link} from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfilAbout from './ProfilAbout'
import ProfilExperience from './ProfilExperience'
import ProfileEducation from './ProfileEducation'

const Profile = ({match,getProfileByid,profile:{profile,loading},auth}) => {
    useEffect(()=>{
        getProfileByid(match.params.id) 
    },[])
    return (
        <Fragment>
         {profile === null || loading ? ( <Spinner/>) : (<Fragment>
            
           <Link to='/profiles' className="btn btn-light">Go Back</Link>
            {auth.isAuthenticated && 
            auth.loading === false && 
            auth.user.id === profile.user._id && (
            <Link to="/edite-profile" className="btn btn-dark">
            Edit Profile
            </Link>

            )}

            <div class="profile-grid my-1">
             <ProfileTop profile={profile}/>
             <ProfilAbout profile={profile}/>
             <div className="profile-exp bg-white p-2">
             <h2 className="text-primary">Experience</h2>
             {profile.experience.length > 0 ? (

            <Fragment>
            {profile.experience.map(experience=>(
                <ProfilExperience key={experience._id} experience={experience}/>
            ))}
            </Fragment>

             ):(<h4>No Experience credentials</h4> )}
             </div>

             <div className="profile-edu bg-white p-2">
             <h2 className="text-primary">Education</h2>
             {profile.education.length > 0 ? (

            <Fragment>
            {profile.education.map(education=>(
                <ProfileEducation key={education._id} education={education}/>
            ))}
            </Fragment>

             ):(<h4>No Education credentials</h4> )}
             </div>
            
            </div>
            </Fragment>) }
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
