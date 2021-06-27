import React, { useContext, useEffect, useState } from 'react'
import { referProduct } from '../../../Appfunctions'
import { ContextApp } from '../../../ContextAPI'

const Invoiceproduct = (props) => {
  const {allproducts} = useContext(ContextApp)
  const {item} = props
  const [product, setProduct] = useState(referProduct(allproducts, item.id))
 
  useEffect(()=>{
    setProduct(referProduct(allproducts, item.id))
  },[item])

  return (
    <tr className='invoiceproduct'>
        <td>
          {product.name} ({item.id})
        </td>
        <td>
          {item.color}
        </td>
        <td >
          {item.size}
        </td>
        <td>
          {item.qty}
        </td>
        <td>
          ${product.price}
        </td>
        <td>
          ${product.price * item.qty}
        </td>
    </tr>
  )
}
export default Invoiceproduct