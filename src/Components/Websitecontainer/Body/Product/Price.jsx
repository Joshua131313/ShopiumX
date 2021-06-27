import React from 'react'
import { formatPrice } from '../../../../Appfunctions'

const Price = (props) => {
  const {product, className} = props
  return (
 <>  
 {product?.sale? 
 <div className={`pricetag ${className?className:''}`}>
    <span className='graytext'>{formatPrice(product?.price*(product?.percent/100)+product?.price)}</span>
    <h3>{formatPrice(product?.price)}</h3>
  </div>
  :
  <div className="price nosaleprice">
  {formatPrice(product?.price)}
  </div>
  }
  </>
  )
} 
export default Price