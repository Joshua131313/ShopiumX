import React, { useContext, useEffect, useState } from 'react'
import { removeFromCart, updateCart } from '../../../Appfunctions'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Appbtn from '../Appbtn/Appbtn'

const Incrementbtn = (props) => {
  const {icon, sign} = props
  const { cartitem, product, stock, qty, color} = props
  const {incart, user, setIncart} = useContext(ContextApp)




  const Increment = () => {

      incart && incart.map(el=> {
        if(el.id === cartitem?.id && el.color === cartitem?.color && el.size === cartitem?.size) { 
          const cartitemindex = incart.indexOf(el)
  
          if(sign === 'positive') {
            
              if(cartitem?.qty < stock){ 

                 //user
                if(user) {
                  incart[cartitemindex].qty = cartitem?.qty+1
                  updateCart(incart, user)
                }  
                else { 
                  setIncart(cart=>cart.map(
                    item=> (
                      item.id === cartitem.id && 
                      item.color === cartitem.color && 
                      item.size === cartitem.size)? {
                      ...item,
                      qty:  cartitem.qty + 1
                    }:item, 
                  ))
                }
              }
            
          }
          else {
            if(cartitem?.qty > 1){
              //user
             if(user) {
              incart[cartitemindex].qty = cartitem?.qty-1
              updateCart(incart, user)
             }
             //not user
             else {
              setIncart(cart=>cart.map(
                item=>(item.id === cartitem.id && item.color === cartitem.color && item.size === cartitem.size)? {
                  ...item,
                  qty:  cartitem.qty - 1
                }:item, 
              ))
             }
            }
            else {
              //user
              if(user) {
                removeFromCart(cartitem, user)
              }
              //not user
              else {
                setIncart(cart=>
                  cart.filter(
                    item=> (!(item.id === cartitem.id && item.color === cartitem.color && item.size === cartitem.size))
                 ))
              }
            }
          }
  
        }
      })
    

  }
  useEffect(()=>{
    if(!user) {
      localStorage.setItem('incart', JSON.stringify(incart))
    }
  },[incart, user])
  return (
    <Appbtn clickEvent={()=> Increment()} icon={icon}/>
  )
}
export default Incrementbtn