import React, { useContext, useEffect, useState } from 'react'
import { convertDateToString, referProduct } from '../../../Appfunctions'
import Tabitem from './Tabitem'
import './Ordercard.css'
import { ContextApp } from '../../../ContextAPI'
import Appbtn from '../Appbtn/Appbtn'
import { Link } from 'react-router-dom'
import Trackpackagebtn from '../Trackpackagebtn/Trackpackagebtn'
import { db } from '../../../Fire'
import Modal from '../Modal/Modal'
import Appinput from '../Appinput/Appinput'
import Appselect from '../Appselect/Appselect'
import TextareaAutosize from 'react-textarea-autosize';
import { addNotification } from '../Addnotification/Addnotification'

const Ordercard = (props) => {
  const {allproducts, orders, notifisystem} = useContext(ContextApp)
  const {order, status, dashboard} = props
  const orderplaced = convertDateToString(order.date.toDate(), false)
  const [edit, setEdit] = useState(false)
  const [carrier, setCarrier] = useState(order.trackingid.carrier)
  const [trackingid, setTrackingid] = useState(order.trackingid.id)
  const [updates, setUpdates] = useState(order.updates)
  
  const  options = [
    {
      text: 'Ordered',
      value: 'Ordered',
      disabled: true
    },
    {
      text: 'Shipped',
      value: 'Shipped',
      disabled: order.updates.some(x=> x.status === 'Shipped')
    },
    {
      text: 'Cancelled',
      value: 'Cancelled',
      disabled: order.updates.some(x=> x.status === 'Cancelled')
    },
    {
      text: 'Delivered',
      value: 'Delivered',
      disabled: order.updates.some(x=> x.status === 'Delivered')
    }
  ]
  const optionsrow = options.map(option=> {
    return (
      <option disabled={option.disabled} value={option.value}>{option.text}</option>
    )
  })
  const handleIndexChange = (value, type, index) => {
    const tempState = [...updates]
    tempState[index][type] = value
    setUpdates(tempState)
  }
  const updatesrow = updates?.map((update, i)=> {
    return (
      <>
   <select disabled={update.status === 'Ordered'} className='checkoutselect' value={update.status} onChange={e=> handleIndexChange(e.target.value, 'status', i)}>
      <option value="Update">Update</option>
      {optionsrow}
    </select>
        <TextareaAutosize
          disabled={update.status === 'Ordered'}
          value={update.details} 
          onChange={(e)=> handleIndexChange(e.target.value, 'details', i)}
          placeholder='Details' />
      </>
    )

  }) 
  const handleCancelOrder = () => {
    const decision = window.confirm('Are you sure you would like to cancel this order?')
    if(decision) {
      orders.forEach(orderc=> {
        if(orderc.orderid === order.orderid) {
          const orderindex = orders.indexOf(orderc)
          orders[orderindex].updates.push({
            status: 'cancelled',
            details: 'Order was cancelled',
            date: new Date()
          })
          db.collection('orders').doc('orders').update({
            orders: orders
          })
        }
      })
    }
  
  }
  const handleAdd = () => {
    let tempState = [...updates]
    tempState.push({
      date: new Date(),
      status: 'Details',
      details: '',
    })
    setUpdates(tempState)
  }
  const handleRemove = (order) => {
    let tempState = [...updates]
    if(tempState.length > 1) {
      tempState.pop()
      setUpdates(tempState)
    }
  }
  const handleUpdates = () => {

    orders.forEach(orderc=> {
      if(order.orderid === orderc.orderid) {
        let index = orders.indexOf(orderc)
        orders[index].trackingid.id = trackingid
        orders[index].trackingid.carrier = carrier
        orders[index].updates = updates
        if(updates.some(x=> x.status === 'Delivered')) {
          orders[index].trackingid.delivery = new Date()
        }
        db.collection('orders').doc('orders').update({
          orders
        })
        .then(()=> {
          addNotification({
            notifisystem,
            msg: 'Order Status Updated!',
            icon: 'fal fa-check-circle'
          })
          setEdit(false)
        })
        .catch(()=> {
          addNotification({
            notifisystem,
            msg: 'Try again later!',
            icon: 'fal fa-exclamation-circle'
          })
        })
      }
    })

  }
  const itemsrow = order?.orderinfo?.products.map(item=> {
   
    const product = referProduct(allproducts, item.id)

    return (
      <div className="orderitem">
        <div className="orderimg">
          <img src={product?.img} alt=""/>
        </div>
        <div className="innerordercont">
           <span>{product?.name}</span>
           <span>Size: {item?.size}</span>
           <span>Color: {item?.color}</span>
           <Link to={`/website/product/${item?.id}`}>
            <Appbtn text={dashboard?'View Product':'Buy Again'}/>
           </Link>
        </div>
      </div>
    )
  })
  const determineControls = () => {
    if(dashboard) {
      return (
      <>
       <Trackpackagebtn order={order} />
       <>
        <Appbtn text='Edit Order Status' clickEvent={()=> setEdit(!edit)}/>
        <Modal modal={edit} setModal={setEdit}>
          <div className="editorder">
            <h2>Edit Order Status</h2>
            <div className="innereditorder">
                <div className="carrier flexed">
                  <h3>Carrier</h3>
                  <Appinput value={carrier} setValue={setCarrier} placeholder='Shipping Carrier'/>
                  <Appinput  value={trackingid} setValue={setTrackingid} placeholder='Tracking #'/>
                </div>
                <div className="statusord flexed">
                  <h3>Updates</h3>
                   {updatesrow}
                  <div className="controlbtns">
                   {updates.length > 1 && <Appbtn text='Remove' clickEvent={()=> handleRemove(order)}/>}
                    <Appbtn text='Add' clickEvent={()=> handleAdd()}/>
                  </div>
         
                </div>
               <Appbtn text='Save' className='saveedit' clickEvent={()=> handleUpdates()}/>
            </div>
          </div>
          <i onClick={()=> setEdit(false)} className="closeicon fal fa-times"></i>
        </Modal>
       </>
       <Appbtn text='Refund Order'/>
      </>
      )


    }
   else if(status === 'ordered') {
      return (
        <>
          <Trackpackagebtn order={order} />
          
          {!order.updates.some(x=> x.status.toLowerCase() === 'shipped')&&
          <>
          <Appbtn text='Edit Shipping Method'/>
          <Appbtn text='Cancel Order' clickEvent={()=> handleCancelOrder()}/>
          <Appbtn text='View/Edit Order' />
          </>
          }

        </>
      )
    }
    else  if(status === 'cancelled'){
      return (
          <>
            
          </>
      )
    }
    else if (status === 'delivered') {
      return (
        <>
          <Trackpackagebtn order={order} />
          <Appbtn text='Return Items'/>
          <Appbtn  text='Write a Review'/>
        </>
      )
    }
  }

  useEffect(()=> {
    setCarrier(order.trackingid.carrier)
    setTrackingid(order.trackingid.id)
  }, [order])

  return (
    <div className="ordercard">
      <div className="orderdescriptiont">
          <div className='odleft'>
            <Tabitem text={orderplaced} title='Order Placed'/>
            <Tabitem text={'$'+order.ordercost.toFixed(2)} title='Total'/>
            <Tabitem text={order.shippinginfo.name+' '+order.shippinginfo.lastname} title='Ship To'/>
          </div>
          <div className="odright">
              <div className="tabitem">
                  <span>Order ID: {order.orderid}</span>
                  <span>
                    <span>View Order Details</span>
                    <span>Invoice</span>
                  </span>
              </div>
          </div>
      </div>
      <div className="orderinfo">
         <div className="ordercont">
          {itemsrow}
         </div>
          <div className="ordercontrols">
            {determineControls()}
          </div>
      </div>
    </div>
  )
}
export default Ordercard
