import React, { useContext } from 'react'
import NotificationSystem from 'react-notification-system'
import { ContextApp } from '../../../ContextAPI'

const Notifisystem =(props)=> {
  const {notifisystem} = useContext(ContextApp)
  const {refe} = props
  const style = {
    NotificationItem: {
      DefaultStyle: {
        backgroundColor: '#fff',
        border: 'solid 1px rgb(0, 0,0,0)',
        boxShadow: 'var(--light-shadow)',
        height: '45px',
        display: 'flex',
        alignItems: 'center'
      },
      warning: {
      }
    }
  }
  return (
    <NotificationSystem style={style} ref={notifisystem}/>
  )

}
export default Notifisystem