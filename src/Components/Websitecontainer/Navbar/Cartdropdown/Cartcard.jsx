import React, { useContext, useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import {  referProduct } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'
import Plusminus from '../../../Reuseable/Plusminus/Plusminus'
import Price from '../../Body/Product/Price'

const Cartcard = (props) => {
  const {allproducts} = useContext(ContextApp)
  const {id, qty, color, size} = props.item
  const [item, setItem] = useState(referProduct(allproducts, id))

  useEffect(()=> {
    setItem(referProduct(allproducts, id))
      // setItem(allproducts.filter(x=> x.id === id)[0])
  }, [id])

  return (
    <div className="cartcard">
      <div className="cartcardimg">
        <HashLink to={`/website/product/${id}`}>
          <img src={item?.img} alt=""/>
        </HashLink>
      </div>
      <div className="cartcardinfo">
          <div className="cardinfo">
          <p>{item?.name}</p>
          <div className='qtyprice'>
              <span>{qty} <i className='fal fa-times'></i></span>
              <Price product={item} sale={item?.sale} className='price'/>
          </div>
          <small style={{textTransform: 'capitalize'}}>Color: {color}</small>
          <small style={{textTransform: 'capitalize'}}>Size: {size}</small>
          </div>
            <Plusminus color={color} size={size} product={item} cartitem={props.item}/>
         
      </div>
    </div>
  )
}
export default Cartcard