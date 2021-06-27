import React from 'react'

const Checkbox = (props) => {

  const {checked, setChecked, text} = props

  return  (

    <div className='forgot'>
   <div className={checked?'checked chk':'unchecked chk'} onClick={()=>setChecked(!checked)}>
    <div className='checkboxcont' >
      <i className='fal fa-check'></i>
    </div>
     <span>{text}</span>
   </div>
    </div>

  )
}
export default Checkbox