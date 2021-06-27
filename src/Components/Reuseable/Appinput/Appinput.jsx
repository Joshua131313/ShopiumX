import React from 'react'
import './Appinput.css'

const Appinput = (props) => {
  const {
  type='text', value, 
  setValue, placeholder, 
  disabled=false, 
  readonly=false,
  required= false, 
  icon, text} = props
  return (
    <label className='appinput'>
      <i className={icon}></i>
      {text&&<span>{placeholder}</span>}
      <input 
      placeholder={placeholder}
      value={value}
      onChange={e=>setValue(e.target.value)}
      type={type}  
      title={placeholder}
      readOnly={readonly}
      required={required} 
      min={0}
      disabled={disabled}/>
   </label>
  )
}
export default Appinput