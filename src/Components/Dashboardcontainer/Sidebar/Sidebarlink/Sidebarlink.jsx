import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebarlink.css'

const Sidebarlink = (props) => {

  const {link, text, icon, exact} = props.link

  return  (
    <NavLink
     exact={exact}
     to={`/dashboard${link}`}
     activeClassName={'activesidelink'}
     className='sidelink'
    >
      <i className={icon}></i>
      <span>{text}</span>
    </NavLink>
  )
}
export default Sidebarlink