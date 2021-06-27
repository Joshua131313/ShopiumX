import React from 'react'
import Expand from './Expand/Expand'

const Checkoutcontainer = (props) => {
  const {title, notopen} = props
  return (
    <div className="checkoutcontainer">
     <Expand  notopen={notopen} text={title} icon='fal fa-chevron-right'>
      {props.children}
     </Expand>
    </div>
  )
}
export default Checkoutcontainer