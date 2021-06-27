import React, { useContext, useState } from 'react'
import { determineInArray, getStockByColorAndSize } from '../../../../../Appfunctions'
import { ContextApp } from '../../../../../ContextAPI'
import Addtocart from '../../../../Reuseable/Addtocart/Addtocart'
import Addtosaved from '../../../../Reuseable/Addtosaved/Addtosaved'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Plusminus from '../../../../Reuseable/Plusminus/Plusminus'
import Logicproduct from '../Logicproduct'
import Price from '../Price'
import Productdetail from '../Productdetail'
import './Productpage.css'
import Horizontalimgscroll from '../../Horizontalscroll/Horizontalimgscroll'
import Horizontalscroll from '../../Horizontalscroll/Horizontalscroll'
import Product from '../Product'
import Tabs from './Tabs/Tabs'
import Reviewsystem from './Reviewsystem/Reviewsystem'
import { HashLink } from 'react-router-hash-link'

const Productpage = (props) => {
  const {incart, allproducts, savedforlater} = useContext(ContextApp)
  const {product} = props
  const [qty, setQty] = useState(0)
  const [imgindex, setImgindex] = useState(0)
  const [activeimg, setActiveimg] = useState(product.img)
  const similarproducts = allproducts.filter(x=> x.type === product.type && x.id !== product.id)
  
const similarproductsrow = similarproducts?.map(product=> {
  return <Product product={product} key={product.id}/>
})

const links = [
  {
    title: 'Description',
    link: 'description',
    content: product.description,
  },
  {
    title: `Reviews (${product.reviews.length})`,
    link: 'reviews',
    content: <Reviewsystem product={product}/>
  }
]
  return (
    <Logicproduct product={product}>
    {({optionsrow, colorsrow, size, color})=>(
   <>
    <div className="productpage">
        <div className="productinfo">
          <div className="productpageimg"> 
             <Horizontalimgscroll imgs={product?.imgs} />
   
          </div>
          <div className='productcontparent'>
          <div className="productpagecont">
            <div className="productitle">
              <h2>{product.name}</h2>
              <Price product={product}/>
    
            </div>
            <div className="productdescip">
              {product.shortdescription}
            </div>
              <small className="graytext productdescip">
                Product ID: {product.id}
              </small>
            <Productdetail>
              <span>Size:</span>
              <span className='select'>{optionsrow}</span>
            </Productdetail>
            <Productdetail>
            <span>Color:</span>
            <span className="colors">
              {colorsrow}
            </span>
            </Productdetail>
            <div className="productcontrols">
            <Addtosaved product={product} text={'Add To Wishlist'} className='wishlistbtn'/>

              {(determineInArray(incart, color, size, product)|| (determineInArray(savedforlater, color, size, product)))
              ?
              (determineInArray(savedforlater, color, size, product))
              ?
               <HashLink to='/website/cart#savedforlater' className='savedforlaterbtn'>
                 <Appbtn text='Saved For Later'/>
                </HashLink>
              :
              <Plusminus  color={color} size={size} cartitem={incart.find(x=> x.id === product.id && x.color === color && x.size === size)}  product={product} />
              :
              getStockByColorAndSize(color, size, product) === 0?
              <Appbtn text='Out of Stock' disabled/>
              :
              <Addtocart color={color} size={size} product={product} disabled={color === ''} disabledtext={'Chose a Color'}/>
            }
            </div>
          </div>
          </div>
        </div>
        <Tabs links={links}/>
        
    </div>
    <h2 className='browsetitle'>Browse {product.type} Products</h2>
  <Horizontalscroll productsrow={similarproductsrow}/>
</>
     )}
    </Logicproduct>
  )
}
export default Productpage