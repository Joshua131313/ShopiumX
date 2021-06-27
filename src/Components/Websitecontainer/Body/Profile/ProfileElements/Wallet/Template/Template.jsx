import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../../Fire'
import Appbtn from '../../../../../../Reuseable/Appbtn/Appbtn'
import Logo from '../../../../../../Reuseable/Logo/Logo'
import './Template.css'

const Template = (props) => {
  const {
  template, 
  from='James Apple', 
  amount=10, 
  setTemplate, 
  selectedtemplate, 
  to, 
  disabled} = props
  const [toName, setToName] = useState('')
 
  useEffect(()=>{
      if(to) {
        db.collection('users').doc(to).onSnapshot(snap=> {
          setToName(snap.data().userinfo.name)
        }) 
      }
    
  },[to])
  
  return (
    <div className={"template "+template.id} id={template.id}>
      <img src={template.img} alt=""/>
       <Logo nolink/>
       <div>
          <span className="from">
           From: {from?from:'Name'} 
          </span>
          <span>
            To: {toName?toName:'Name'}
          </span>
          <span className="amount">Amount: ${parseFloat(amount).toFixed(2)}</span>
       </div>
       <div>
         <span>Gift Card</span>
         <span>Amount: ${parseFloat(amount).toFixed(2)}</span>
       </div>
      {!disabled&&<span className="selecttemplate">
          <Appbtn text={selectedtemplate===template.id?'Selected':'Select Template'} clickEvent={()=> setTemplate(template.id)}/>
      </span>}
    </div>
  )
}
export default Template
