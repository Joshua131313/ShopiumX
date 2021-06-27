import React from 'react'
import { Link } from 'react-router-dom'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Appinput from '../../../Reuseable/Appinput/Appinput'
import User from '../../../Reuseable/User/User'
import './Navbar.css'

const Navbar = () => {

  return (
    <div className="dashboardnav">
        <div className="leftpartd">
          <Link to='/dashboard/products/add'>
            <Appbtn text='Add Product' icon='fal fa-plus'/>
          </Link>
          <div className="dashsearch">
            <Appinput icon='fal fa-search' placeholder={'Search...'}/>
            <Appbtn text='Search'/>
          </div>
        </div>
        <div className="rightpartd">
          <User />
        </div>
    </div>
  )
}
export default Navbar