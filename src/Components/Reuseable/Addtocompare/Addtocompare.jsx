import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Appbtn from '../Appbtn/Appbtn'
import firebase from 'firebase'
const Addtocompare = (props) => {
  const {setCompared, compared, setComparetab, user} = useContext(ContextApp)
  const {text, product} = props
 
  const Addtocompare = () => {
  
      if(compared.includes(product.id)) {
        if(user) {
          db.collection('users').doc(user.uid).update({
            compared: firebase.firestore.FieldValue.arrayRemove(product.id)
          })
        }
        else {
          setCompared(compared=> compared.filter(x=> x !== product.id))
        }
      }
      else {
        if(user) {
          db.collection('users').doc(user.uid).update({
            compared: firebase.firestore.FieldValue.arrayUnion(product.id)
          })
        }
        else {
          setCompared(compared=> [...compared, product.id])
        }
      }
  }
  
  return ( 
    <Appbtn 
    icon={`${compared.includes(product.id)?"fas":'fal'} fa-random`} text={text} 
    clickEvent={()=>{ Addtocompare(); setComparetab(true)}}
    />
  )
}
export default Addtocompare