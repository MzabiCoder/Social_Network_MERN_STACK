import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route,Redirect} from 'react-router-dom'

const PrivateRoute = ({component:Component,auth:{isAuthenticated,loading},...rest}) =>(
    <Route {...rest} redner={props=>!isAuthenticated && !loading ?(<Redirect to='/login'/>):(<Component {...props}/>)}/>
)

PrivateRoute.propTypes = {
auth:PropTypes.object.isRequired
}

const map=state=>({
    auth:state.auth
})

export default connect(map)(PrivateRoute)
