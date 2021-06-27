import React, { useContext, useEffect } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import firebase from 'firebase'
import { getStockByColorAndSize, removeFromCart, updateCart } from '../../../Appfunctions'

const Incrementinput = (props) => {
  
  const {incart, user, setIncart} = useContext(ContextApp)

  const {cartitem, product, qty, color, size, disabled} = props
  const stock =  getStockByColorAndSize(color, size, product)
 

  

  const updateQty = (e) => {
    console.log(e.target.value)
    const numvalue = parseFloat(e.target.value)
      if(!isNaN(numvalue)){
        incart && incart.map(el => {
          if(el.id === cartitem.id && el.color === color && el.size === size) {
    
            const cartitemindex = incart.indexOf(el)
            if((stock <= numvalue)) {
              if(user) {
              incart[cartitemindex].qty = stock
              updateCart(incart, user)
              }
              else {
                setIncart(cart=>cart.map(
                  item=>(item.id === cartitem.id && item.color === cartitem.color && item.size === cartitem.size)? {
                    ...item,
                    qty:  stock
                  }:item, 
                ))    
              }
            }
            else {
             if(numvalue===0) {
              if(user) {
                removeFromCart(cartitem, user)
              }
              else {
                setIncart(cart=>
                  cart.filter(
                    item=> (!(item.id === cartitem.id && item.color === cartitem.color && item.size === cartitem.size))
                 ))
              }
             }
             else {
              if(user) {
                incart[cartitemindex].qty = numvalue
                updateCart(incart, user)
              }
              else {
                setIncart(cart=>cart.map(
                  item=> (item.id === cartitem.id && item.color === cartitem.color && item.size === cartitem.size)? {
                    ...item,
                    qty:  numvalue
                  }:item, 
                )) 
              }
            }
            }
          }
        })
      }
    

  }
   
  return (
    <input disabled={disabled} className='qty' type='number' onChange={(e)=> updateQty(e)} contentEditable={true}  
    value={cartitem?cartitem?.qty:qty}/>
  )
}
export default Incrementinput