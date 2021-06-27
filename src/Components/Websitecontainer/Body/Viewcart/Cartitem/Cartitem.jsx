import React, { useContext, useEffect, useState } from 'react'
import { formatPrice, getStockByColorAndSize, referProduct } from '../../../../../Appfunctions'
import { ContextApp } from '../../../../../ContextAPI'
import Plusminus from '../../../../Reuseable/Plusminus/Plusminus'
import Price from '../../Product/Price'
import Grayspancont from './Grayspancont'
import './Cartitem.css'
import { db } from '../../../../../Fire'
import firebase from 'firebase'
import { HashLink } from 'react-router-hash-link'
const Cartitem = (props) => {
  const {allproducts, user, setSavedforlater, setIncart} = useContext(ContextApp)
  const {product, incart, remove, add, disabled, nototal} = props
  const [item, setItem] = useState(referProduct(allproducts, product.id))
  const [isoutofstock, setIsoutofstock] = useState(false)
  const [lessstock, setLessstock] = useState(false)

  const saveForLater = () => {
      if(user) {
        db.collection('users').doc(user.uid).update({
          [add]: firebase.firestore.FieldValue.arrayUnion(product)
        })
        db.collection('users').doc(user.uid).update({
          [remove]: firebase.firestore.FieldValue.arrayRemove(product)
        })
      }
  }
  const deleteItem = () => {
    if(user) {
      db.collection("users").doc(user.uid).update({
        [remove]: firebase.firestore.FieldValue.arrayRemove(product)
      })
    }
    else {
      setIncart(cart=>
        cart.filter(
          item=> (!(item.id === product.id && item.color === product.color && item.size === product.size))
       ))
    }
  }
  const updateItem = (qty) => {
    incart && incart.map(el=> {
      if(el.id === product.id) {
        let index = incart.indexOf(el)
        incart[index].qty = qty
        if(user) {
          db.collection('users').doc(user.uid).update({
            cart: incart
          })
        }
      }
    })
  }

  useEffect(()=> {
    const productc= referProduct(allproducts, product.id)
    const stockitem =  getStockByColorAndSize(product.color, product.size, productc)
    setItem(productc)
    if(stockitem=== 0){
      setIsoutofstock(true)
      updateItem(0)
    }
    else if(getStockByColorAndSize(product.color, product.size, productc)< product.qty) {
      setLessstock(true)
      updateItem(stockitem)
    }
    else {
      setIsoutofstock(false)
    }

  }, [product]) 

  return (
    <div className="cartitem">
      <div className="cartiteminfo">
        <HashLink to={`/website/product/${product.id}`}>
         <img src={item.img} alt=""/>
        </HashLink>
        <div className='cartiteminfoin'>
          <strong>{item.name}</strong>
          <div>
            <Grayspancont 
            info={product.color}
            title='Color:'
            />
           <Grayspancont 
            info={product.size}
            title='Size:'
            />
           <Grayspancont 
            info={product.id}
            title='Product ID:'
            />
            <div className='cartcontrol'>
            {lessstock&& <span className='saveforlater' style={{color: 'var(--red)', cursor: 'auto'}}>Qty Updated</span>}
            {isoutofstock&&<span className='saveforlater' style={{color: 'var(--red)', cursor: 'auto'}}>Out of Stock</span>}
           {user&&<span onClick={()=> saveForLater()} className="graytext saveforlater">{remove==='cart'?"Save for later":'Move to Cart'}</span>}
            <span onClick={()=> deleteItem()} className='graytext saveforlater'>Remove</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rightcartitem">
      <div className="qtycont">
        <Plusminus
        className='reversecartitem' 
        color={product?.color}
        size={product?.size}
        product={item}
        cartitem={product}
        disabled={disabled}
        />
      </div>
      <div className="pricecont priceconta">
        <Price product={item}/>
      </div>
      {
        !nototal&&
      <div className="total">
        <span>
          {formatPrice(item?.price * product?.qty)}
        </span>
      </div>
      }
      </div>
    </div>
  )
}

export default Cartitem