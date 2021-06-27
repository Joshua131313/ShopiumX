import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ContextApp } from '../../../../ContextAPI'
import Cartdropdown from '../Cartdropdown/Cartdropdown'

const Navright = (props) => {

  const {user, setSearch, cart,  setCart, handleLogout, menu, setMenu, setCartposition, incart, setShowinput} = useContext(ContextApp)
  const cartref = useRef()
  

  useEffect(()=>{
    setCartposition({
     right: cartref.current.getBoundingClientRect().x,
    })  
    
  },[window.innerWidth]) 

  return (
    <div className="right">

    <div className='iconright'>
      <i className='fal fa-search searchicon' onClick={()=> setShowinput(prev=> !prev)}></i>
    <Link to={'/website/saved'}>
     <i className='fal fa-heart'></i>
    </Link>

    <div className="cart" >
    <div className="carticon" onClick={(e)=> {setCart(prev=> !prev); e.stopPropagation()}}>
      <i className='fal fa-shopping-bag' ref={cartref} ></i>
      {
      incart.length !== 0&&
      <div className="qtycart">
        {incart?.reduce((acc, cur)=>{
          return acc + cur.qty
        }, 0)}
      </div>
      }
    </div>
    <Cartdropdown />
    </div>
   <Link to={!user?'/login':'/website/profile'}>
     <i className={`fal fa-user`} ></i>
   </Link>
    <i onClick={()=> setMenu(!menu)} className={`mobbtn fal fa-${menu?"times":'bars'}`}></i>
    </div>
  </div>
  
  )
}
export default Navright