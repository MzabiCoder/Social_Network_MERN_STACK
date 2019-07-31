import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getProfiles} from '../../action/profile'
import ProfileItem from './ProfileItem'


const Profiles = ({getProfiles,profile:{loading,profiles}}) => {
    useEffect(()=>{
        getProfiles()
    },[])
    return (
        <Fragment>
        {loading ? <Spinner/>:<Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
        <i className="fab fa-connectdevelop"></i>Brows and connect with developers
        </p>    
        <div className="profiles">
        {profiles.length>0 ? profiles.map(profile=>(
            <ProfileItem key={profile.id} profile={profile}/>

        )):<h4>No Profiles found...</h4>}
        </div>  
            
        </Fragment>}    
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const map=state=>({
    profile:state.profile
})

export default connect(map,{getProfiles})(Profiles)
