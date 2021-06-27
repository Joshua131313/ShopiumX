import React, {useContext, useState} from 'react'
import { ContextApp } from '../../../../ContextAPI'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Appinput from '../../../Reuseable/Appinput/Appinput'
import Modal from '../../../Reuseable/Modal/Modal'
import './Trackorder.css'
import Trackordermodal from './Trackordermodal'

const Trackorder = (props) => {
  const {orders} = useContext(ContextApp)
  const [modal, setModal] = useState(false)
  const [email, setEmail] = useState('joshtosh13@hotmail.com')
  const [id, setId] = useState('SqtzwyjvEgMYLrGJp1xO')
  const [trackingOrder, sestTrackingOrder] = useState({})
  
  const validateTracking = () => {
    if(orders.some(x=>
      x.orderid.toLowerCase() === id.toLowerCase() && 
      x.shippinginfo.email.toLowerCase() === email.toLowerCase()
      )) 
    {
      sestTrackingOrder(orders.find(x=> x.orderid === id))
      setModal(true)
    }
    else {
      window.alert('Order Not Found!')
    }
  }
  return (
    <div className='trackorder'>

        <div className="trackordercont">
        <div className="centeredtop">
        <h2>Track An Order</h2>
        <small className="graytext">
          To track your order provide your billing email and the Order ID, found in the email sent from ShopiumX. 
        </small>
      </div>
      <div className="trackingcontrols">
        <Appinput
          value={id} 
          setValue={setId}  
          text 
          placeholder='Order ID'/>
        <Appinput 
          value={email} 
          setValue={setEmail} 
          text 
          placeholder='Billing Email'/>
        <Appbtn 
          text='Track Order' 
          clickEvent={()=>validateTracking()}/>
      </div>
  
        </div>
        <Trackordermodal 
        order={trackingOrder} 
        modal={modal} 
        setModal={setModal} />
    </div>
  )
}
export default Trackorder