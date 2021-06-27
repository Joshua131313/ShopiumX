import React, {useContext} from 'react'
import { HashLink } from 'react-router-hash-link'
import { ContextApp } from '../../../../ContextAPI'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Pricetotal from './Pricetotal'
const Subtotal = (props) => {

  const {setCart} = useContext(ContextApp)
  
  return (
    <div className="subtotal">
      <div className='pricetotal'>
        <span>SUB TOTAL</span>
        <strong>
          <Pricetotal />
        </strong>
      </div>
      <div className="checkoutbtns">
      <HashLink to='/website/checkout' onClick={()=> setCart(false)}>
        <Appbtn text={'Proceed to checkout'}/>
      </HashLink>
       <HashLink to='/website/cart' onClick={()=> setCart(false)}>
        <Appbtn text={'View cart'}  className='outline'/>
       </HashLink>
      </div>
    </div>
  )
}
export default Subtotal