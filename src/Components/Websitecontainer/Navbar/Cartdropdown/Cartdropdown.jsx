import React, { useContext, useEffect, useRef } from 'react'
import { ContextApp } from '../../../../ContextAPI'
import Cartcard from './Cartcard'
import './Cartdropdown.css'
import Subtotal from './Subtotal'
import { CSSTransition } from 'react-transition-group';
import { HashLink } from 'react-router-hash-link'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'

const Cartdropdown = () => {
  const {setCart, cart, incart} = useContext(ContextApp)
  
  const incartrow = ([...incart].reverse()).filter(x=> x.qty !== 0)?.map(item=> {
    return <Cartcard item={item}/>
  })
  
  const cartcontref = useRef()

  useEffect(()=>{
    window.onclick=()=>{
      if(cart) {
        setCart(false)
      }
    }
  },[cart])

  return (
   <CSSTransition in={cart} unmountOnExit classNames='cartdropdown' timeout={300}>
      <div className={`cartdropdown `} onClick={(e)=> e.stopPropagation()}>
        <h3>
          <span>{incart.length===0?'Empty Cart':"Your Cart"}</span>
          <i className='fal fa-times' onClick={()=> setCart(false)}></i>
        </h3>
      
        {incart.length !==0?
         <> 
        <div className="productscart" ref={cartcontref}>
            {incartrow}
        </div>
        <Subtotal />
        </>
        :
        <div className="emptycart">
          <h3>Your Shopping Cart is Empty!</h3>
          <HashLink to='/website/shop'>
            <Appbtn text='Continue Shoppping' clickEvent={()=> setCart(false)}/>
          </HashLink>
        </div>   
        }
    </div>
   </CSSTransition>
  )
}
export default Cartdropdown