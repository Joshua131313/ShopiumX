import React from 'react'
import { NavHashLink } from 'react-router-hash-link';
import './Navbarlink.css'

const Navbarlink = (props) => {
  const {link, text} = props.link
  const {clickEvent, setMenu} = props
  
  return (
    <NavHashLink 
    isActive={(match, location)=> {if(match) return true}} 
    activeClassName='activelink' smooth to={`/website${link}`} 
    onClick={()=>{clickEvent && clickEvent(); setMenu && setMenu(false)}} 
    className='navbarlink'>
      <span>{text}</span>
      <div></div>
    </NavHashLink>
  )
}
export default Navbarlink