import React, { useState } from 'react'
import './Switch.css'

const Switch = (props) => {
  const {checked, updateInfo} = props

  return  (
    <div className='switchdiv'>
      <div className="flexrow switchdiv">
      <p>{props.title}</p>
      <label className='form-switch'>
      <input type="checkbox"
       checked={checked} 
       onChange={(e)=>{updateInfo && updateInfo(e.target.checked)}}/>
      <i></i>
      </label>
      </div>
    </div>
  )
}
export default Switch