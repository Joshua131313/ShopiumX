import React, { useState } from 'react'
import { db } from '../../../../../../Fire'
import AccordionTab from '../../../../../Reuseable/Accordion/Accordion'
import Appbtn from '../../../../../Reuseable/Appbtn/Appbtn'


const Coupons = (props) => {

  const {coupons, setCoupons} = props


  const handleChange = (val, coupon, i, type) => {
    const tempState = [...coupons]

    tempState.forEach((el)=> {
       tempState[i][type] = val
    })
    setCoupons(tempState)
  }
  
  const couponsrow = coupons?.map((coupon, i)=> {
    return (
      <div className={`${(coupon.couponcode || coupon.discount)?'selectededitsize':''} couponitem`}>
        <AccordionTab title={'Coupon '+(i+1)}>
        <label htmlFor="" className='appinput'>
            <span>Coupon Code</span>
            <input type="text" value={coupon.couponcode}
             placeholder='Coupon Code'
             onChange={(e)=> handleChange(e.target.value, coupon, i, 'couponcode')}
            />
          </label>
          <label htmlFor="" className='appinput'>
            <span>Discount ($)</span>
            <input type="number" 
             value={coupon.discount}
             onChange={(e)=> handleChange(parseFloat(e.target.value), coupon, i, 'discount')}
             placeholder='Discount'
            />
          </label>
        </AccordionTab>
      </div>
    )
  })
  const pushCouponObj = () => {
    const tempState = [...coupons]
    tempState.push({
      couponcode: db.collection('users').doc().id,
      discount: 0
    })
    setCoupons(tempState)
  }
  const removeCoupon = () => {

    const tempState = [...coupons]
    tempState.pop()
    setCoupons(tempState)
  }
  return (
    <div className="addcoupons">
        <h3>Coupons</h3>
        <div className="couponscontainer">
          <div className="innercoupons">
            {couponsrow}
          </div>
          <div className="couponcontrols">
           {coupons.length !== 0 && 
           <Appbtn text='Remove Coupon' clickEvent={()=> removeCoupon()}/>
           }
           <Appbtn text='Add Coupon' clickEvent={()=> pushCouponObj()}/>
          </div>
        </div>
    </div>
  )
}
export default Coupons