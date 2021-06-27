import React, { useContext } from 'react' 
import { NavLink } from 'react-router-dom'
import { ContextApp } from '../../../../../ContextAPI'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Sidebarlink from './Sidebarlink'

const Linkstab = (props) => {
  const {links} = props
  const {handleLogout, dashboardusers, user} = useContext(ContextApp)
  const linksrow = links.map(link=>{
    return <Sidebarlink link={link} />
  })

  
  return (
    <div className="linkstab">
       {
      ( user && dashboardusers.includes(user.uid))&&
        <NavLink 
            to={`/dashboard`}>
            <i className='fal fa-th'></i>
          <span>Dashboard</span>
        </NavLink>
      }
       {linksrow}
        <Appbtn 
        text='Log Out' 
        icon='fal fa-sign-out' 
        className='reverse'
        clickEvent={()=> handleLogout()}
        />
    </div>
  )
}
export default Linkstab