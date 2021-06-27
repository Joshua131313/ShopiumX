import {useState, useEffect, useContext} from 'react'
import { ContextApp } from '../../../ContextAPI'
import Appbtn from '../Appbtn/Appbtn'
import { addNotification } from './Addnotification'

const Addnoti = (msg, icon) => {
  const {notifisystem} = useContext(ContextApp)
  const useNoti = addNotification({
    notifisystem,
    msg,
    icon
  })

  return (
    <Appbtn />
  )
}
export default Addnoti