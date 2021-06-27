import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextApp } from '../../../ContextAPI'
import './User.css'

const User = (props) => {

  const {userinfo} = useContext(ContextApp)
  const {link='/dashboard/settings'} = props


  return  (
      <Link to={link} className="user">
        <img src={userinfo.cover} alt=""/>
        <span>{userinfo.name}</span>
      </Link>
  )
}
export default User