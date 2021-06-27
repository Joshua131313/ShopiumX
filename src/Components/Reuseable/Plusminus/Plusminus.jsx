import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Appbtn from '../Appbtn/Appbtn'
import './Plusminus.css'
import firebase from 'firebase'
import Incrementinput from '../Incrementbtn/Incrementinput'
import Incrementbtn from '../Incrementbtn/Incrementbtn'
import Logicproduct from '../../Websitecontainer/Body/Product/Logicproduct'
import { getStockByColorAndSize } from '../../../Appfunctions'
const Plusminus = (props) => {
  const {product, cartitem, color, size, className, disabled} = props

  const [stock, setStock] = useState()
  useEffect(()=>{
      setStock(product?.sizes.find(x => x.size === cartitem?.size)?.colors.find(x=> x.color === cartitem.color)?.stock) 
  },[cartitem, product])
  const passdownprops = {
    color,
    size,
    stock,
    product,
    cartitem
  }
  return ( 
   
    <div className={`${disabled&&'disabledplusminus'} plusminus`}>
        <Incrementbtn  {...passdownprops}  icon='fal fa-minus' />
        <Incrementinput disabled={disabled} {...passdownprops} />
        <Incrementbtn  {...passdownprops} sign='positive' icon='fal fa-plus' />
   </div>  


  )
}
export default Plusminus