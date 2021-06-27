import React, { useContext } from 'react'
import { referProduct } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'
import Product from '../Product/Product'

const Saved = (props) => {
  const {saved, allproducts} = useContext(ContextApp)
  console.log(saved)
  const savedforlaterrow = saved?.map(product=> {
    return <Product product={referProduct(allproducts, product)}/>
  })  

  return (
    <div className="savedproducts">
      <h3>Your Saved Products({saved.length})</h3>
      <div className="innersavedproducts">
        {savedforlaterrow}
      </div>
    </div>
  )
}
export default Saved