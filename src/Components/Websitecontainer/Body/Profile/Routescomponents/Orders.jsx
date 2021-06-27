import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { ContextApp } from '../../../../../ContextAPI'
import Filterorders from '../ProfileElements/Filterorders/Filterorders'
import Tabs from '../../Product/Productpage/Tabs/Tabs'

const Orders = (props) => {
  const {userorders} = useContext(ContextApp)
  const {link} = props
  const links = [
    {
      title: 'Orders',
      link: 'website/profile/ordered',
      content: <Filterorders status='ordered' orders={userorders.filter(x=>(!x.updates.some(el=> el.status ==='cancelled'))&& (!x.updates.some(el=> el.status ==='delivered')) && (x.updates.some(el=> el.status.toLowerCase() === 'ordered' )))} />,
    },
    {
      title: `Delivered`,
      link: 'website/profile/delivered',
      content: <Filterorders status='delivered' orders={userorders.filter(x=> x.updates.some(el=> el.status.toLowerCase() === 'delivered'))} />
    },
    {
      title: `Cancelled`,
      link: 'website/profile/cancelled',
      content: <Filterorders status='cancelled' orders={userorders.filter(x=> x.updates.some(el=> el.status.toLowerCase() === 'cancelled'))} />
    },
    
  ]
 
  return (
    <div className='innercont payment'>
        <Tabs links={links}/>
    </div>
  )
}

export default Orders