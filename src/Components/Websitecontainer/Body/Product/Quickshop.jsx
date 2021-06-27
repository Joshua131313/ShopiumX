import React, { useContext } from 'react'
import { HashLink } from 'react-router-hash-link'
import { determineInArray, getStockByColorAndSize } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'
import Addtocart from '../../../Reuseable/Addtocart/Addtocart'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Horizontalimgscroll from '../Horizontalscroll/Horizontalimgscroll'
import Logicproduct from './Logicproduct'
import Price from './Price'
import Productdetail from './Productdetail'
import './Quickshop.css'
const Quickshop = (props) => {
  const {product} = props
  const {setQuickview, setCart, incart, savedforlater} = useContext(ContextApp)

  const imgsrow = product?.imgs.map((img, i)=> {
    return <img src={img} alt="" key={img}/>
  })
  return (
    <>
    <div className="screen" onClick={()=> setQuickview(false)}></div>
    <div className="quickshop">
    <i className='fal fa-times' onClick={()=> setQuickview(false)}></i>

     <Horizontalimgscroll imgs={product?.imgs}/>
     
      <Logicproduct className='quickshopitem' product={product}>
        {({optionsrow, colorsrow, size, color})=>(
          <div className="contentproduct">
          <h2>
            <span>{product.name}</span>
          </h2>
          <Productdetail>
            <span>
              Price:
            </span>
            <span>
              <Price className='price' product={product} sale={product.sale}/>
            </span>
          </Productdetail>
          <Productdetail>
            <span>Sizes:</span>
            <span className='select'>
              {optionsrow}
            </span>
          </Productdetail>
          <Productdetail>
            <span>
              Colors: <section style={{textTransform: 'capitalize', display: 'inline'}}>{color}</section>
            </span>
            <span className='colors'>
              {colorsrow}
            </span>
          </Productdetail>
          <Productdetail>
            <span>Material Info:</span>
            <span>97% Cotton, 3% Elastane</span>
          </Productdetail>
 
          <div className="productbtns">
         { 
        getStockByColorAndSize(color, size, product) === 0?
        <Appbtn disabled text='Out of Stock'/>
        :
        !((determineInArray(incart, color, size, product) || determineInArray(savedforlater, color, size, product)))?
         <Addtocart 
            clickEvent={()=> {color!==''&&setQuickview(false); color!==''&&setTimeout(()=>{setCart(true)}, 200)}}
            color={color} 
            size={size}
            disabled={color === '' }
            disabledtext={'Chose a Color'}
            product={product} 
            icon='fal fa-shopping-bag' 
            className='reverse'/>
          :(determineInArray(savedforlater, color, size, product))?
          <HashLink to='/website/cart#savedforlater' onClick={()=> setQuickview(false)}>
            <Appbtn text='Saved For Later'/>
          </HashLink>
          :
          <Appbtn text='View Cart' clickEvent={()=> {setQuickview(false); setTimeout(()=>{ setCart(true)}, 200)}}/>
          }
           <HashLink onClick={()=> setQuickview(false)} to={`/website/product/${product.id}`}>
           <Appbtn text='View Details'  className='outline'/>
           </HashLink>
          </div>
       </div>
        )}
      </Logicproduct>
    </div>
    </>
  )
}
export default Quickshop