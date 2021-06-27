import React from 'react'
import Appinput from '../../../../../Reuseable/Appinput/Appinput'

const Cardinforow = (props) => {
  const {title, value, setValue, type='text', placeholder} = props


  return (
  <h3 className='cardinforow'>
    <span>{title}:</span>
    <Appinput type={type} placeholder={placeholder} value={value} setValue={setValue}/>
  </h3>
  )
}
export default Cardinforow