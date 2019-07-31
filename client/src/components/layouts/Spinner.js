import React,{Fragment} from 'react'
import spinner from '../../img/spinner.gif'

const Spinner = () => {
    return (
        <div className="spinner">
         <img src={spinner} 
         style={{width:'250px',margin:'auto',dispaly:'block'}}
         alt=""
         />
        </div>    
    )}

export default Spinner
