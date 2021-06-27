import React from 'react'

const Mysection = (props) => {
  const {children, title} = props
  return (
    <div className="section">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
export default Mysection