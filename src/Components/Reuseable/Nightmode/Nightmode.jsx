import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Switch from '../Switch/Switch'

const Nightmode = () => {

  const {darkmode, user} = useContext(ContextApp)

  const updateInfo = () => {
    db.collection('users').doc(user.uid).update({
      "customization.darkmode":  !darkmode
    })
  }

  return  (
    <div className="nightmode">
    <Switch checked={darkmode} updateInfo={updateInfo}/>
    <i className='fal fa-moon-stars'></i>
  </div>
  )
}
export default Nightmode