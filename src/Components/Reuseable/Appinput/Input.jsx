import React from 'react'
import './Appinput.css'

const Input = (props) => {
  const {icon, placeholder, text} = props

  return (
    <label className='appinput inp'>
    
    {text&&<span>{placeholder}</span>}
    <div>
    <input 
      {...props}
     />
       {icon&&<i className={icon}></i>}
    </div>
 </label>
  )
}
export default Input