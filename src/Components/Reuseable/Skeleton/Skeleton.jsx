import React from 'react'
import './Skeleton.css'
const Skeleton = (props) => {

    const {style = {} } = props

  return (
  <div className="skeleton" style={style}>
    <div className="skeletonimg"></div>

    <div className="skeletontitle"></div>
    <div className="skeletonprice"></div>
  </div>
  )
}

export default Skeleton