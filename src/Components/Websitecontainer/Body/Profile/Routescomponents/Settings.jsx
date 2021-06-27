import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../../../ContextAPI'
import { db } from '../../../../../Fire'
import { addNotification } from '../../../../Reuseable/Addnotification/Addnotification'
import Appinput from '../../../../Reuseable/Appinput/Appinput'
import Input from '../../../../Reuseable/Appinput/Input'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Imgupload from '../../../../Reuseable/Imgupload/Imgupload'

const Settings = (props) => {

  const {userinfo, user, notifisystem} = useContext(ContextApp)
  const [name, setName] = useState(userinfo.name)
  const [phone, setPhone] = useState(userinfo.phone)
  const [age, setAge] = useState(userinfo.email)
  const inputs = [
    {placeholder: 'Name', icon: 'fal fa-user', state: name, setState: setName},
    {placeholder: 'Age', icon: 'fal fa-calendar-plus', number: true, state: age, setState: setAge},
    {placeholder: 'Phone', icon: 'fal fa-phone', number: true, state: phone, setState: setPhone},
  ]
  const inputsrow = inputs.map(input=> {
    const {state, setState, placeholder, icon, number} = input 
    return (
      <Input 
        type={number?'number':'text'}
        min={1}
        required
        icon={icon}
        placeholder={placeholder} 
        value={state} 
        onChange={(e)=>setState(e.target.value)}
      />
    )
  })
  const addNot = (msg, icon) => {
    addNotification({
      notifisystem,
      msg: msg, 
      icon: icon
    })
  } 
  const updateProfile = () => {
    db.collection('users').doc(user.uid).update({
      'userinfo.name': name,
      'userinfo.phone': parseFloat(phone),
      'userinfo.age': parseFloat(age),
    })
    .then(()=> {
      addNot('Profile Updated', 'fal fa-check-circle')
    })
    .catch(()=> {
   
      addNot('Something went wrong...', 'fal fa-exclamation-circle')

    })
  }
  const updateImg = (url) => {
    
    db.collection('users').doc(user.uid).update({
      'userinfo.cover': url
    }).then(()=>{
      addNot('Image uploaded successfully!','fal fa-check-circle')

    })
    .catch(()=>{
      addNot('Something went wrong...', 'fal fa-exclamation-circle')
    })
    
  }

  return (
    <div className="userinfotab">
      <div className="userimg">
         <Imgupload 
          show
          randomid={false}
          icon='fal fa-camera' 
          img={userinfo.cover} 
          updateImg={updateImg}/>
          <div className="name">
            <span>{userinfo.name}</span>
            <small>User ID: {user.uid}</small>
          </div>
      </div>
      <div className="userinputs">
      {inputsrow}
      <Appbtn 
        clickEvent={()=> updateProfile()}
        text='Save Info' 
        className='reverse' 
        icon='fal fa-save'/>
      </div>
    </div>
  )
}
export default Settings