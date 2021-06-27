import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Appbtn from '../Appbtn/Appbtn'
import firebase from 'firebase'


const Addtocart = (props) => {
  const {icon, product, className, clickEvent, color, size, disabled, disabledtext='Out of Stock'} = props
  const {user, setCartcontscrolled, setIncart} = useContext(ContextApp)
  function addToCart() { 
    const obj = {
        id: product.id,
        qty: 1,
        color,
        size   
    }     
    if(user) { 
      db.collection('users').doc(user.uid).update({
        cart: firebase.firestore.FieldValue.arrayUnion(obj)
      })
    }
    else {
      setIncart(prev=> [...prev, obj])
    }
  }
  
  return (
    <Appbtn 
    text={disabled?disabledtext:'Add to Cart'}
    disabled={disabled} 
    disabledtext={disabledtext}
    className={`reverse ${className?className:''}`} 
    icon={!disabled&&icon && icon} 
    clickEvent={()=> {addToCart(); clickEvent && clickEvent(); setCartcontscrolled(true)}}/>
  )
}
export default Addtocart