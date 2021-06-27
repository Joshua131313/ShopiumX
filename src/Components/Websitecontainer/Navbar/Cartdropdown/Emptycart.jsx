import React from 'react'
import { HashLink } from 'react-router-hash-link'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'

const Emptycart = () => {


  return (
        <div className="emptycart">
        <h3>Your Shopping Cart is Empty!</h3>
        <HashLink to='/website/shop'>
          <Appbtn text='Continue Shoppping' />
        </HashLink>
    </div>   
    
  )
}