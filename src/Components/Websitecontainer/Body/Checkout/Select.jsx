import React from 'react'

const Select = (props) => {

  const {options, placeholder, setValue, value, type} = props

  const optionsrow = options?.map(option=>{
    return (
      <option value={option}>{option}</option>
    )
  })

  return ( 
    <select className='checkoutselect' placeholder={placeholder} value={value[type]} onChange={e=> setValue({[type]:e.target.value})}>
      <option value="">{placeholder}</option>
      {optionsrow} 
    </select>
  )
}
export default Select