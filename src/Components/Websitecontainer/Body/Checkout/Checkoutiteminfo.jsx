import React, { useContext, useEffect, useState } from 'react'
import { referProduct } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'
import Price from '../Product/Price'

const Checkoutiteminfo = (props) => {
  const {item} = props
  const {allproducts} = useContext(ContextApp)
  const [product, setProduct] = useState(referProduct(allproducts, item.id))
  
  useEffect(()=>{
    setProduct(referProduct(allproducts, item.id))
  },[item, allproducts])

  return (
    <div className="checkoutiteminfo">
        <div>
          <img src={product.img} alt=""/>
        </div>
        <div>
          <span>{product.name} x {item.qty}</span>
          <small>
            <span>
              <span>Size:</span>
              <span>{item.size}</span>
            </span>
            <span>
              <span>Color:</span>
              <span>{item.color}</span>
            </span>
          </small>
        </div>
        <Price product={product} className='price'/>
    </div>
  )
}
export default Checkoutiteminfo