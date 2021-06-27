import React from 'react'
import Ordercard from '../../../../../Reuseable/Ordercard/Ordercard'
import './Filterorders.css'
const Filterorders = (props) => {
  const {orders, status} = props

  const ordersrow = orders.map(order=> {
    return <Ordercard order={order} status={status}/>
  })

  return (
    <div className="filterorders">
        {ordersrow}
    </div>
  )
}
export default Filterorders