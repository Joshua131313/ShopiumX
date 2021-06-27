import React from 'react'
import { ButtonBase } from '@material-ui/core';

const Loginbtn = (props) => {
  const {icon, clickEvent, text} = props

  return (
   <ButtonBase className='loginbtn' onClick={()=> {clickEvent()}}>
      <span>{text}</span>
      <i className='fad fa-long-arrow-right'></i>
   </ButtonBase>
  )
}
export default Loginbtn