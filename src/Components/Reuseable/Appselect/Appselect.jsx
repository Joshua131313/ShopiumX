import React from 'react'

const Appselect = (props) => {
  const {optionsrow, defaultoption, value, setValue} = props

  

  return (
    <select className='checkoutselect' value={value} onChange={e=> setValue(e.target.value)}>
      <option value={defaultoption.value}>{defaultoption.text}</option>
      {optionsrow}
    </select>
  )
}
export default Appselect