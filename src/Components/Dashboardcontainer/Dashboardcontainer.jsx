import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { ContextApp } from '../../ContextAPI'
import Routes from './Routes/Routes'
import Sidebar from './Sidebar/Sidebar'
import './Dashboard.css'

const Dashboardcontainer = (props) =>{
  const {handleLogout, notifisystem, user, darkmode, dashboardusers} = useContext(ContextApp)
  const [hasAccess, setHasAccess] = useState(true)

  useEffect(()=>{
    if(user) {
      if(dashboardusers.includes(user.uid)) {
        setHasAccess(true)
      }
      else {
        setHasAccess(false)
      }
    }
  },[user, dashboardusers])

  return (
  <div className={`dashboard app ${darkmode?'darkdashboard':''}`}>

     <Sidebar />
     <Routes />
     {!hasAccess && <Redirect to='/website'/>}
      
  </div>
  )
}
export default Dashboardcontainer