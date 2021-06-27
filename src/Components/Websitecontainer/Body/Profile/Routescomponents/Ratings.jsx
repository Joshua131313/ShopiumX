import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContextApp } from '../../../../../ContextAPI'
import AccordionTab from '../../../../Reuseable/Accordion/Accordion'
import Review from '../../Product/Productpage/Reviewsystem/Review'
import Reviewcont from '../ProfileElements/Reviewcont'

const Ratings = (props) => {
  const {allproducts, user}  = useContext(ContextApp)

const userratingsrow = allproducts?.map(product=> {
 
  const root = product.reviews
  
  if(root.some(x=> x.postedby === user.uid)){
      return (
          <AccordionTab title={
          <Link className='accordionlink' to={`/website/product/${product.id}`}>{product.name}</Link>
          }>
           <div className="accordionitem">
            { 
            root.map(rating=> {
              if(rating.postedby === user.uid) {
                  return (
                    <Review review={rating} reviews={root}/>
                )
                }
            })
              }
           </div>
          </AccordionTab>
      )
  }
})


  return (
    <div className="userratings">
        {userratingsrow}
    </div>
  )
}
export default Ratings
