import React, {useState, useEffect, useContext} from 'react'
import { sumExpenses, sumSales } from '../../../../../Appfunctions'
import { ContextApp } from '../../../../../ContextAPI'
import Tabs from '../../../../Websitecontainer/Body/Product/Productpage/Tabs/Tabs'
import Giftcards from '../Giftcards/Giftcards'
import Orders from '../Orders/Orders'
import './Sales.css'

const Sales = (props) => {
  const {orders, allgiftcards, allproducts} = useContext(ContextApp)

  const links = [
    {
      link: 'giftcards',
      title: 'Gift Card Sales',
      content: <>
        <div>
          <h3>Net Profit: ${(allgiftcards?.reduce((n, {paid}) => n + paid, 0)).toFixed(2)}</h3>
        <Giftcards />
        </div>
      </>
    },
    {
    link: 'orders',
    title: 'Order Sales',
    content: <>
      <div>
        <h3>Net Profit: {(sumSales(orders) - sumExpenses(orders, allproducts)).toFixed(2)} </h3>
        <Orders />
      </div>
    </>
    }
  ]

  return (
    <div className="dashboardsales templatecont">
      <h3>Sales</h3>

      <div className='innersales payment'>
        <Tabs links={links}/> 
      </div>
  
    </div>
  )
}
export default Sales