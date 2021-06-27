import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../Fire'
import './User.css'

const Reuseableuser = (props) => {
  const {user} = props
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [img, setImg] = useState('')
  useEffect(()=>{
    db.collection('users').doc(user).onSnapshot(snap=> {
      const userinfo = snap.data().userinfo
      setName(userinfo.name)
      setImg(userinfo.cover)
      setId(user)
    })
  },[user])


  return (
   <span  className="user">
    <img src={img} alt=""/>
    <Link to={'/dashboard/members'}>{name}</Link>
  </span>
  )
}
export default Reuseableuser