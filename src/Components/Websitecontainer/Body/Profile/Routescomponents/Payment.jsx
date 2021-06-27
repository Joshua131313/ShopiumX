import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { ContextApp } from '../../../../../ContextAPI'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Tabs from '../../Product/Productpage/Tabs/Tabs'
import Cards from '../ProfileElements/Wallet/Cards'

const Payment = (props) => {

  const {link} = props
  const {cards, giftcards} = useContext(ContextApp)
  const links = [
    {
      title: 'Credit Cards',
      link: 'website/profile/creditcards',
      content: <Cards cards={cards} title={'Credit Cards'} cc btntext='Add Credit Card'/>,
    },
    {
      title: `Gift Cards`,
      link: 'website/profile/giftcards',
      content: <Cards cards={giftcards.filter(x=> x.amount !== 0)} gift title={'Gift Cards'} btntext='Add Gift Card'/>
    },
    {
      title: `Used Gift Cards`,
      link: 'website/profile/usedgiftcards',
      content: <Cards cards={giftcards.filter(x=> x.amount === 0)} gift title={'Gift Cards'} btntext='Add Gift Card'/>
    },
  ]

  return (
    <div className='innercont payment'>
        <Tabs links={links} />
    </div>
  )
}

export default Payment