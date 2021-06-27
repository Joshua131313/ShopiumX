import React from 'react'
import './Logininput.css'
const Logininput = (props) => {
  const {value, setValue ,type='text', placeholder, icon, eye, showpassword, clickEvent, error} = props


  return (
     <label className='logininputlabel'>
        <input required value={value} className='logininput' type={type} placeholder={placeholder}  onChange={(e)=> setValue(e.target.value)}/>
        <i className={icon}></i>
        {eye&&<i className={!showpassword?'fal fa-eye':'fal fa-eye-slash'} onClick={()=>clickEvent()}></i>}
        <span>{error}</span>
     </label>
  )
}
export default Logininput