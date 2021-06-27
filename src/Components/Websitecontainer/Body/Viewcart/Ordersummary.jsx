import React, { useContext, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { totalPrice } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Couponcontainer from './Couponcontainer'

const Ordersummary = (props) => {
  const {incart, allproducts, percentoff, appliedcodes} = useContext(ContextApp)
  const {className} = props
  const [expand, setExpand] = useState(false)
  const totalpricewithcoupons = totalPrice(incart, allproducts, appliedcodes, percentoff)
  
  return (
    <div className={"ordersummary "+className} onClick={e=> e.stopPropagation()}>
      <div>
   <h3>Order Summary</h3>
    <div className="summaryinfo">
      <div>
        <span>Items:</span>
        <span>
        {incart?.reduce((acc, cur)=>{
          return acc + cur.qty
         }, 0)}
        </span>
      </div>
      <div className='shipping'>
        <span>Shipping:</span>
        <span>{totalpricewithcoupons>50?'Free Shipping':"$4.99"}</span>
      </div>
      <div className="totalcostwithshipping">
         <span>Total Cost (excluding tax):</span>
         <span>${totalpricewithcoupons.toFixed(2)}</span>
      </div>
      <HashLink to='/website/checkout'>
        <Appbtn text='Checkout'/>
      </HashLink>
      <div className="coupons">
        <div className='coupontitle' onClick={()=> setExpand(!expand)}>  
        <span>Discount Codes:</span>
        <i className={`fal fa-${expand?'minus':"plus"}`}></i>
        </div>
        <Couponcontainer expand={expand}/> 
      </div>
    </div>
    </div>
  </div>
  )
}
export default Ordersummary