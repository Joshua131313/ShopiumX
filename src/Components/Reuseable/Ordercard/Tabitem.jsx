import React from 'react'


const Tabitem = (props) => {
  const {title, text} = props

  return (
    <div className="tabitem">
      <span>{title}</span>
      <span>{text}</span>
    </div>
  )

}
export default Tabitem