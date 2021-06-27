import React, { useContext, useEffect, useState } from 'react'
import { totalPrice } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'

const Pricetotal = () => {

  const {incart, allproducts} = useContext(ContextApp)
  const [total, setTotal] = useState(0)
  
  useEffect(()=> {
    

      setTotal(totalPrice(incart, allproducts, [], 0))
    
  },[incart, allproducts])
 
  return (
    <div className="pricetotal">
      ${total.toFixed(2)}
    </div>
  )
}
export default Pricetotal