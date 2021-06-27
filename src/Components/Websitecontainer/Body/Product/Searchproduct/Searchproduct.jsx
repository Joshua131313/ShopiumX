import React, { useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'
import Price from '../Price'
import './Searchproduct.css'
const Searchproduct = (props) => {

  const {product, activeClassName, setCursor, i, cursor, setCursorlink, setShow, setFilterkeyword, setShowinput, setMenu} = props

  useEffect(()=> {
    if(cursor === i) {
      setCursorlink(product.id)
    }
  },[cursor, i, product])


  return (
    <HashLink 
    onClick={()=> {setShow(false); setMenu && setMenu(false);setShowinput(false); setFilterkeyword('')}} 
    onMouseOver={()=> {setCursor(i); setCursorlink(product.id)}} 
    to={`/website/product/${product.id}`} 
    className={"searchproduct "+activeClassName}>
     
      <div className="imgsearchproduct">
        <img src={product.img} alt=""/>
      </div>
      <div className="searchproductcont">
        <h4>{product.name}</h4>
        <small>
          <Price product={product} className='price'/>
        </small>
      </div>
      
    </HashLink>
  )
  }
  export default Searchproduct