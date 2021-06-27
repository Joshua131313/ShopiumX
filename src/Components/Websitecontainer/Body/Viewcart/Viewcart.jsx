import React, { useContext, useState, useEffect } from 'react'
import { ContextApp } from '../../../../ContextAPI'
import Cartcontaineritem from './Cartcontaineritem'
import Cartitem from './Cartitem/Cartitem'
import Ordersummary from './Ordersummary'
import './Viewcart.css'

const Viewcart = () => {
  const [viewsummary, setViewsummary] = useState(false)
  const {incart, savedforlater, scrolled, user} = useContext(ContextApp)
  const incarttow = incart?.map(product=> {
    return (
      <Cartitem incart={incart} remove='cart' add='saveforlater' product={product}/>
    )
  })
  const savedforlaterrow = savedforlater?.map(product=> {
    return (
     <Cartitem nototal disabled incart={savedforlater} remove='saveforlater' add='cart' product={product}/>
    )
  })
  useEffect(()=>{

     if(viewsummary) {
      window.onclick=()=>{
        setViewsummary(false)
      }
     }

  },[viewsummary])
  
  return (
    <div className="viewcart">
     <div onClick={(e)=> {setViewsummary(!viewsummary); e.stopPropagation()}} className={scrolled?"viewsummarystrip viewsummarystripactive":'viewsummarystrip'}>
        <i className={`fal fa-chevron-${viewsummary?'right':'left'}`}></i>
        <span>{viewsummary?'Hide Summary':"View Summary"}</span>
      </div>
      <div className="leftviewcart">
           <h2 className='saveforlatertitle'>Cart</h2>
          <Cartcontaineritem array={incarttow}/>
       {user&&<> <h2 className='saveforlatertitle'>Saved for Later</h2>
          <Cartcontaineritem nototal id='savedforlater' array={savedforlaterrow}/>
        </>}
      </div>
  
      <Ordersummary className={viewsummary?'active':''}/>
    </div>
  )
}
export default Viewcart