import React from 'react'

const Filtercol = (props) => {
  const {title} = props

  return (
    <div className="filtercol">
      <h4>{title}</h4>
      {props.children}
    </div>
  )

}
export default Filtercol