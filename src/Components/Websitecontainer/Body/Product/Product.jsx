import React, { useContext, useEffect, useState } from 'react'
import { getRating } from '../../../../Appfunctions'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Ratings from './Ratings'
import './Product.css'
import { NavHashLink } from 'react-router-hash-link'
import { ContextApp } from '../../../../ContextAPI'
import Addtosaved from '../../../Reuseable/Addtosaved/Addtosaved'
import Price from './Price'
import Addtocompare from '../../../Reuseable/Addtocompare/Addtocompare'
import Skeleton from '../../../Reuseable/Skeleton/Skeleton'


const Product = (props) => {
  const {allproducts, cartposition, setQuickshopid, setQuickview} = useContext(ContextApp)
  const {product} = props
  const [avgrating, setAvgrating] = useState(0)
  const [flytocart, setFlytocart] = useState(false)
  const [activeimg, setActiveimg] = useState(product?.img)
  const [loaded, setLoaded] = useState(false)

  useEffect(()=> {
    setAvgrating(getRating(product.reviews))
    setActiveimg(product.img)
  }, [ product]) 

  return (
    <>

 <div className="product" style={loaded?{}:{display: 'none'}}>
    <img  onLoad={()=> setLoaded(true)} src={product.img} alt="" style={flytocart?{left: cartposition.right*100/window.innerWidth+'%'}:{}} className={`flytocart ${flytocart?'flyingnow':''}`}/>
    <div className="top" 
    onMouseLeave={()=> setActiveimg(product.img)}
    onMouseOver={()=> setActiveimg(product.imgs.length > 1?product.imgs.filter(x=> x !==product.img)[0]:product.img)}>
     <NavHashLink to={`/website/product/${product.id}`}>
      <img src={activeimg} alt="" 
     
      /> 
     </NavHashLink>
      <div className="controls">
       {
       <Addtosaved product={product} saveditem={allproducts.filter(x=> x.id === product.id)[0]}/>
       }
       {
        <Appbtn clickEvent={()=> {setQuickview(true); setQuickshopid(product.id)}} text='Quick Shop' className='big'/>
        }
        <Addtocompare product={product}/>
      </div>
      {product.sale&&
          <div className='ribbon'> 
            <span>
            {product.percent+'% OFF'}
            </span>
          </div>
      }
    </div>
    <div className="bottom">
      <div className="name">
        <span>{product.name}</span>
        <Ratings rating={avgrating} readonly/>
      </div>
  
      {
      <Price sale={product.sale} product={product} className='price'/>
      }
    </div>

  </div>
   
  <Skeleton style={loaded?{display: 'none'}:{}}/>
   
  </>
  )
}
export default Product