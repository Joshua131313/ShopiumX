import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { referProduct } from '../../../../../Appfunctions'
import { ContextApp } from '../../../../../ContextAPI'
import Review from '../../Product/Productpage/Reviewsystem/Review'

const Reviewcont = (props) => {
  const {allproducts} = useContext(ContextApp)
  const {rating} = props 
  const [product, setProduct] = useState(referProduct(allproducts, rating.productid))
  useEffect(()=> {
    setProduct(referProduct(allproducts, rating.productid))
  },[rating, allproducts])

  return (
    <>
      <Link to={`/website/product/${product.id}`}>{referProduct(allproducts, rating.productid).name}</Link>
      <Review review={rating.review} reviews={product.reviews}/>
    </>
  )
}
export default Reviewcont