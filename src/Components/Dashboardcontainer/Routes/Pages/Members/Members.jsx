import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../../../ContextAPI'
import Ordercard from '../../../../Reuseable/Ordercard/Ordercard'
import Table from '../../../../Reuseable/Table'
import Giftcard from '../Giftcards/Giftcard'
import Innergiftcard from '../Giftcards/Innergiftcard'
import Pagetemplate from '../Pagetemplate'
import './Members.css'
const Members = (props) => {

  const {allusers, allgiftcards, orders} = useContext(ContextApp)
  const [sort, setSort] = useState('fromuserid')
  console.log(orders)
  const [sorted, setSorted] = useState([])
  const options = [
  
    {
      value: 'touserid',
      text: 'Show received giftcards'
    },
    {
      value: 'orders',
      text: 'Show purchased orders'
    }
  ]
  const allusersrow = allusers?.map(user=> {
    return (
      <Giftcard sort={sort} id={user}>
        {sort!=='orders'?
          allgiftcards.filter(x=> x[sort] === user).map(giftcard=> {
            return <Innergiftcard card={giftcard} sort={sort}/>
          })
          :
          orders.filter(x=> x.userid === user).map(order=> {
            return  <Ordercard dashboard order={order} status={sort==='userid'?'ordered':sort}/>
          })
        }
      </Giftcard>
    )
  })
  const optionsrow = options.map(option=> {
    return (
      <option value={option.value}>{option.text}</option>
    )
  })

  useEffect(()=>{
    const sortHelper = (user) => {
      setSorted(allgiftcards.filter(x=> x[sort] === user))
    }
     
  }, [sort])

  return (
    <Pagetemplate 
      className='memberspage'
      title='Members'
      sort={sort}
      setSort={setSort}
      defaultoption={{value: 'fromuserid', text: 'Show purchased giftcards' }} 
      optionsrow={optionsrow}>
        <div className={sort !=='orders'?"innermemberpage memberpagegifts":'innermemberpage'}>
          <Table filtered={allusersrow} />
        </div>
     
    </Pagetemplate>
  )
}
export default Members