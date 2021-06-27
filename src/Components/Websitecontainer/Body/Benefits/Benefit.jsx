import React from 'react'
import './Benefit.css'

const Benefit = (props) => {
  const {icon, title, text} = props.benefit
  return (
    <div className="benefit">
      <div className="icon">
        <i className={icon}></i>
      </div>
      <div className="info">
        <h3>{title}</h3>
        <span className="graytext">
          {text}
        </span>
      </div>
    </div>
  )
}
export default Benefit