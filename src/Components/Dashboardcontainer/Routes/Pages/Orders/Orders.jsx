import { TablePagination } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { convertDateToString } from '../../../../../Appfunctions'
import { ContextApp } from '../../../../../ContextAPI'
import Table from '../../../../Reuseable/Table'
import Tablec from '../../../../Websitecontainer/Body/Bodyroutescomponents/Shop/Table/Table'
import Pagetemplate from '../Pagetemplate'
import Order from './Order'
import './Orders.css'

const Orders = (props) => {
  const {orders} = useContext(ContextApp)
  const [sort, setSort] = useState('userid')
  const [sorted, setSorted] = useState([])
   const options = [
    {
      text: 'Sort by Cancelled',
      value: 'cancelled',
      type: 'cancelled'
    },
    {
      text: 'Sort by Ordered',
      value: 'ordered', 
      type: 'status'
    },
    {
      text: 'Sort by Shipped',
      value: 'shipped',
      type: 'status'
    },
    {
      text: "Sort by Delivered",
      value: 'Delivered',
      type: 'status'
    }
  ]
  const optionsrow = options.map(option=> {
    return (
      <option value={option.value}>{option.text}</option>
    )
  })

  const allordersrow =Object.entries(sorted).map(order=> {
    return (
      <Order dashboard orders={order[1]} id={order[0]} sort={sort}/> 
    )
  })

 useEffect(()=> {
    let bucketed = orders.reduce((acc, x)=> {
    if(options.some(x=> x.value === sort)) {
      let pivot = x.updates.find(x=> x.status.toLowerCase() === sort.toLowerCase())?.date
      if(pivot) {
        let pivotDate = convertDateToString(pivot.toDate(), true)
        let currentVals = ((acc?.hasOwnProperty(pivotDate)) )? acc[pivotDate] : []
  
        currentVals.push(x)
        acc[pivotDate] = currentVals
      }
    }
    else {
      let pivot = x[sort]
      let currentVals 
      if(sort === 'date') {
        currentVals = ((acc?.hasOwnProperty(convertDateToString(pivot.toDate(), true))) )? acc[convertDateToString(pivot.toDate(), true)] : []
      }
      else {
        currentVals = (acc?.hasOwnProperty(pivot))? acc[pivot] : []
  
      }
      currentVals.push(x)
      acc[sort==='date'?convertDateToString(pivot.toDate(), true):pivot] = currentVals
    }
  
    return acc 
  }, {})
   setSorted(bucketed)
 },[sort, orders])

  return (
    <Pagetemplate
      className='orders'
      title='Recent Orders' 
      sort={sort}
      setSort={setSort}
      optionsrow={optionsrow}
      defaultoption={{value: 'userid', text: 'Arrange by Buyer'}}
      >
      <div className="innerallproducts">
          <Table filtered={allordersrow}/>
      </div>
    </Pagetemplate>
  )
}
export default Orders