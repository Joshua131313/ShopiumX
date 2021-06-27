import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextApp } from '../../../ContextAPI'
import Appbtn from '../../Reuseable/Appbtn/Appbtn'
import Logo from '../../Reuseable/Logo/Logo'
import Nightmode from '../../Reuseable/Nightmode/Nightmode'
import Switch from '../../Reuseable/Switch/Switch'
import {dashboardlinks} from '../Arrays'
import './Sidebar.css'
import Sidebarlink from './Sidebarlink/Sidebarlink'
const Sidebar = (props) => {
  const {userinfo, handleLogout} = useContext(ContextApp)
  const linksrow = dashboardlinks.map(link=> {
    return (
      <Sidebarlink link={link} />
    )
  })

  return (
    <div className="sidebar">
      <div className="namecont">
        <Logo nolink/>
        <span>{userinfo.name}</span>
        <span>{userinfo.email}</span>
        <Nightmode />
      </div>
      <div className="sidebarlinks">
        {linksrow}
        <Link className='sidelink' to='/website'>
          <i className='fad fa-browser'></i>
          <span>Website</span>
        </Link>
       
      </div>
      <Appbtn clickEvent={()=> handleLogout()} text='Logout' className='reverse' icon='fal fa-sign-out-alt'/>
    </div>
  )
}
export default Sidebar