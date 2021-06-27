import React, {useState, useEffect, useContext} from 'react'
import { db } from '../../../../../Fire'
import firebase from 'firebase'

const Alloweduser = (props) => {
  const {user} = props
  const [name, setName] = useState('')
  const [img, setImg] = useState('')

  const removeUser = () => {
    db.collection('allusers').doc('allusers').update({
      allowedusers: firebase.firestore.FieldValue.arrayRemove(user)
    })
  }

  useEffect(()=> {
    db.collection('users').doc(user).onSnapshot(snap=> {
      const data = snap.data()
      setName(data.userinfo.name)
      setImg(data.userinfo.cover)
    })
  }, [user])
  return (
    <div className="alloweduser">
      <div className="leftuser">
        <img src={img} alt=""/>
        <span className="username">
          {name}
        </span>
      </div>
      <div className="rightuser">
        <i className='fal fa-times' onClick={()=> removeUser()}></i>
      </div>
    </div>
  )
}
export default Alloweduser
