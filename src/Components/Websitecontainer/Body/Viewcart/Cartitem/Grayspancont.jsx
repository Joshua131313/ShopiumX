import React from 'react'

const Grayspancont = (props) => {

  const {title, info} = props

  return (
    <span className="grayspancont">
      <span className="graytext">{title}</span>
      <span className="info">{info}</span>
    </span>
  )
}
export default Grayspancont