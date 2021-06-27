import React, { useContext } from 'react'
import { referProduct } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'
import Product from '../Product/Product'
import './Compare.css'
const Compare = (props) => {
  const {compared, allproducts, setComparetab} = useContext(ContextApp)

  const comparedrow = compared?.map(compare=> {
    return (
      <Product product={referProduct(allproducts, compare)}/>
    )
  })
  

  return (
    <>
    <i className="closeicon fal fa-times" onClick={()=> setComparetab(false)}></i>

    <div className="compare">
        <div className="innercompare">
          {comparedrow}
        </div>
    </div>
    </>
  )
}
export default Compare