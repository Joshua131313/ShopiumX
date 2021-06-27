import React, { useState } from 'react'
import { db } from '../../../../../Fire'
import AccordionTab from '../../../../Reuseable/Accordion/Accordion'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'


const Promotions = (props) => {

  const {promotions, setPromotions} = props


  const handleChange = (val, coupon, i, type) => {
    const tempState = [...promotions]

    tempState.forEach((el)=> {
       tempState[i][type] = val
    })
    setPromotions(tempState)
  }
  
  const couponsrow = promotions?.map((promotion, i)=> { 
    return (
      <div className={`${(promotion.promotion || promotion.percent)?'selectededitsize':''} couponitem`}>
        <AccordionTab title={'Promotion '+(i+1)}>
        <label htmlFor="" className='appinput'>
            <span>Promotion Code</span>
            <input type="text" value={promotion.promotion}
             placeholder='Promotion Code'
             onChange={(e)=> handleChange(e.target.value, promotion, i, 'promotion')}
            />
          </label>
          <label htmlFor="" className='appinput'>
            <span>Percent OFF (%)</span>
            <input type="number" 
             value={promotion.percent}
             onChange={(e)=> handleChange(parseFloat(e.target.value), promotion, i, 'percent')}
             placeholder='Percentage'
            />
          </label>
        </AccordionTab>
      </div>
    )
  })
  const pushCouponObj = () => {
    const tempState = [...promotions]
    tempState.push({
      promotion: db.collection('users').doc().id,
      percent: 0
    })
    setPromotions(tempState)
  }
  const removeCoupon = () => {

    const tempState = [...promotions]
    tempState.pop()
    setPromotions(tempState)
  }
  return (
    <div className="addcoupons">
        <div className="couponscontainer">
          <div className="innercoupons">
            {couponsrow}
          </div>
          <div className="couponcontrols">
           {promotions.length !== 0 && 
           <Appbtn text='Remove Promotion' clickEvent={()=> removeCoupon()}/>
           }
           <Appbtn text='Add Promotion' clickEvent={()=> pushCouponObj()}/>
          </div>
        </div>
    </div>
  )
}
export default Promotions