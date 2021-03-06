import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfilExperience =({experience:{
    company,title,current,to,from,description
}}) => <div>
<h3 className="text-dark">{company}</h3>
            <p>
            <Moment format="YYYY/MM/DD">{from}</Moment>- {!to ? 'Now':<Moment
            format="YYYY/MM/DD"
            >{to}</Moment>}
            </p>
            <p> <strong>Position: {title}</strong></p>
            <p> <strong>Description:{description}</strong></p>
        </div>
    

ProfilExperience.propTypes = {
    experience:PropTypes.array.isRequired
}

export default ProfilExperience
