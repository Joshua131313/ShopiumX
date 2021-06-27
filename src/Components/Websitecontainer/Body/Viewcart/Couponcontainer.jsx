import React, { useContext } from 'react'
import { ContextApp } from '../../../../ContextAPI'
import Applycode from './Applycode'

const Couponcontainer = (props) => {
  const {coupon, promotioncode, setCoupon, setPromotioncode} = useContext(ContextApp)
  const {expand} = props
  return (
  <div className={`expandcoupon ${expand?'expanded':''}`}>
    <Applycode placeholder='Coupon' code={coupon} setCode={setCoupon}/>  
    <Applycode placeholder='Promotion' code={promotioncode} setCode={setPromotioncode}/>  
  </div> 
  )
}
export default Couponcontainer