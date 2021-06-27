import React from 'react'
import Navleft from './Navbarparts/Navleft'
import Navright from './Navbarparts/Navright'

const Navbarcontainer = (props) => {
  const {scrolled} = props

  return (
  <div className={`${scrolled?'navactive':''} navbar`}>
     <Navright />
     <Navleft />
  </div>
  )
}
export default Navbarcontainer