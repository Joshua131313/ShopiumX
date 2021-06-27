import React from 'react'
import Productcard from '../../Elements/Dashboardproduct/Productcard'


const Products = (props) => {

  const {products} = props

  const productsrow = products?.map(product=> {
    return <Productcard product={product}/>
  })

  return (
    <div className="productssold">
      {productsrow}
    </div>
  )
}
export default Products
