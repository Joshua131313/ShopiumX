import React, { useContext, useState } from 'react'
import { getDiscountDollarFromCode, getInCartProducts } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Appinput from '../../../Reuseable/Appinput/Appinput'

const Applycode = (props) => {
  const {setAppliedcodes, setPercentoff, appliedcodes, allproducts, incart, couponcode} = useContext(ContextApp)
  const {placeholder, setCode, code, clickEvent} =  props
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const applyCodes = () => {
   if(placeholder==='Coupon'){
    if(getInCartProducts(allproducts, incart).some(x=> x.coupons.some(x=> x.couponcode === code && !appliedcodes.some(x=> x.code === code)))) {
      setAppliedcodes(prev=> [...prev, {discount: getDiscountDollarFromCode(allproducts, code, incart), code: code}])
      setSuccess('Coupon Applied!')
      setTimeout(()=>{
        setSuccess('')
      },2000)
    }
     else {
       if(getInCartProducts(allproducts, incart).some(x=> x.coupons.some(x=> appliedcodes.some(x=> x.code === code)))){
        setError('Already Applied!')
       }
       else {
         setError('Invalid Code!')
       }
       setTimeout(()=>{
         setError('')
       },2000)
     }
   }
   else {
     if(code === couponcode.code) {
      setPercentoff(couponcode.discount)
      setSuccess('Applied!')
      setTimeout(()=>{
        setSuccess('')
      },2000)
     }
     else {
       setError('Invalid Code!')
       setTimeout(()=>{
        setError('')
      },2000)
     }
   }
   setCode('')
  }

  return (
   <div> <div className="applycode">
      <Appinput placeholder={placeholder} value={code} setValue={setCode}/>
      <Appbtn text='Apply' clickEvent={()=> applyCodes()}/>
    </div>
    <div className='couponmsg'>
    <span className='success ' style={{color: 'var(--green)'}}>{success}</span>
    <span className="error graytext" style={{color: 'var(--red)'}}>{error}</span>
    </div>
 </div> )
}
export default Applycode