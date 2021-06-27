import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ContextApp } from '../../../../../ContextAPI'

const Sidebarlink = (props) => {
  const {setBreadcrumbs} = useContext(ContextApp)
  const {link} = props

  return (
    <NavLink 
    onClick={()=>setBreadcrumbs(prev=> [{text: link.text, link: `website/profile${link.link}`}])}
    exact 
    activeClassName='activesidebarlink' 
    to={`/website/profile${link.link}`}>
      <i className={link.icon}></i>
      <span>{link.text}</span>
    </NavLink>
  )
}
export default Sidebarlink