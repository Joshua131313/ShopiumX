import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Appbtn from '../Appbtn/Appbtn'
import firebase from 'firebase'
const Addtosaved = (props) => {
  const {text, product, saveditem, className} = props
  const {saved, user, setSaved} = useContext(ContextApp)
  const saveditembool = saved.includes(product.id)
 
  const addtoSaved = () => {
    if(saveditembool) {
      if(user) { 
        db.collection('users').doc(user.uid).update({
          saved: firebase.firestore.FieldValue.arrayRemove(product.id)
       })
      }
      else {
        setSaved(saved=> saved.filter(x=> x !== product.id))
      }
    }
    else {
      if(user) {
        db.collection('users').doc(user.uid).update({
          saved: firebase.firestore.FieldValue.arrayUnion(product.id)
        })
      }
      else {
        setSaved(saved=>[...saved, product.id])
      }
    }

  }

  return (
    <Appbtn
    className={className+' reverse'}
    clickEvent={()=> addtoSaved()} 
    icon={saveditembool?'fas fa-heart':'fal fa-heart'} 
    text={saveditembool?'Added to Wishlist':'Add to Wishlist'}/>
  )
}
export default Addtosaved