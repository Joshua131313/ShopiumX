import React, {useState, useEffect, useContext} from 'react'
import './Settings.css'
import Setting from '../../../../Websitecontainer/Body/Profile/Routescomponents/Settings'
import { ContextApp } from '../../../../../ContextAPI'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Allowedusers from './Alloweduser'
import Appinput from '../../../../Reuseable/Appinput/Appinput'
import { db } from '../../../../../Fire'
import firebase from 'firebase'
const Settings = (props) => {
  const {dashboardusers} = useContext(ContextApp)
  const [userid, setUserid] = useState('')
  const allowedusers = dashboardusers?.map(user=> {
    return (
      <Allowedusers user={user}/>
    )
  })
  const pushUserID = () => {
    db.collection('allusers').doc('allusers').update({
      allowedusers: firebase.firestore.FieldValue.arrayUnion(userid)
    })
    .then(()=> {
      setUserid('')
    })
  }

  return (
    <div className="dashboardsales templatecont">
      <h3>Settings</h3>

      <div className="innersettings">
         <Setting />
      </div>
      <div className="userids">
        <h4>Allowed Users</h4>
        <div className="inneruserids">
        {
          allowedusers
        }
        </div>
      <div className="couponcontrols">
        <Appinput value={userid} setValue={setUserid} placeholder='User ID'/>
         <Appbtn text='Add User' clickEvent={()=> pushUserID()}/>
      </div>
      </div>
    </div>
  )
}
export default Settings