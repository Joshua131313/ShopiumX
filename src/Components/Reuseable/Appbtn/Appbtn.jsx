import React from 'react'
import './Appbtn.css'
const Appbtn = (props) => {
  const {text, icon, clickEvent, className='', disabled} = props


  return (
  <button className={className+' appbtn'} onClick={()=>clickEvent && clickEvent()} disabled={disabled}>
    {icon&&<i className={icon}></i>}
    {text && <span>{text}</span> }
  </button>
  )
}
export default Appbtn