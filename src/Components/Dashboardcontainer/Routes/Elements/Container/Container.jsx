import React from 'react'
import './Container.css'

const Container = (props) => {
  const {title, className=''} = props

  return (
    <div className={"containerd "+className}>
      <div className="propstitle">
        <h2>{title}</h2>
      </div>
      <div className="propscont">
        {props.children}
      </div>
    </div>
  )
}
export default Container