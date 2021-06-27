import React, { useContext, useEffect, useState } from 'react'
import { totalPrice, totalPriceWithTax } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'
import Checkoutiteminfo from './Checkoutiteminfo'

const Summary = (props) => {
  const {title, title2, giftcardsamount, className } = props
  const {allproducts, user} = useContext(ContextApp)
  const [totalpricewithtax, setTotalpricewithtax] = useState(0)
  const {
     incart,
     appliedcodes, percentoff, 
     selectedshipping, rate} = props
    
    
     const incartrow = incart?.filter(x=> x.qty !== 0)?.map(item=> { 
    
      return <Checkoutiteminfo item={item}/>
    
    })

    const determineTotalPrice = () => {
        if(giftcardsamount === totalpricewithtax || giftcardsamount > totalpricewithtax) {
          return 0.00
        }
        else if(giftcardsamount < totalpricewithtax) {
          return (totalpricewithtax - giftcardsamount).toFixed(2) 
        }
    }


    useEffect(()=>{
      setTotalpricewithtax(totalPriceWithTax(incart, allproducts, appliedcodes, percentoff, rate)+selectedshipping?.price)
    },[ incart, appliedcodes, percentoff, allproducts, totalpricewithtax, rate, selectedshipping])
  
  return  (
    <div className={"summaryside "+className} onClick={(e)=> e.stopPropagation()}>
    <div className="summarysidecont">
         <div className='summarytitle'>
       <h3 style={{fontSize: '17px'}}>{title}</h3>
       </div>
     <div className="borderbtm infocost">
       <div className="subtotal">
         <span>Order Subtotal:</span>
         <span>${totalPrice(incart, allproducts, [], 0).toFixed(2)}</span>
       </div>
       <div className="coupons">
         <span>Coupons:</span>
         <span>${appliedcodes?.reduce((n, {discount}) => n + discount, 0)}</span>
       </div>
        {
          user && 
          <div className="giftcards">
          <span>Gift Cards Balance:</span>
          <span>${parseFloat(giftcardsamount).toFixed(2)}</span>
        </div>
        }
       <div className="promotion">
         <span>Promotion:</span>
         <span>{percentoff}%</span>
       </div>
       <div className="shipping">
         <span>{selectedshipping?.type}:</span>
         <span>${selectedshipping?.price}</span>
       </div>
       <div className="tax">
         <span>Estimated Tax: ({rate?.toFixed(2)*100}%)</span>
         <span>${(totalPrice(incart, allproducts, [], 0)*rate).toFixed(2)}</span>
       </div>
       <div className="grandtotal">
         <strong>TOTAL: </strong>
         <span className="themetext">
           ${determineTotalPrice()}
         </span>
       </div>   
       </div>
       <div className="items borderbtm">
         <span>{title2}:</span>
         {incartrow}
       </div>
     
       </div>
   </div>
  )
}
export default Summary