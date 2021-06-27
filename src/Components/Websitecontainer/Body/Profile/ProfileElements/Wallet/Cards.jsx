import React, { useState } from 'react'
import { giftcardtemplates } from '../../../../../../Appconstants'
import Appbtn from '../../../../../Reuseable/Appbtn/Appbtn'
import Modal from '../../../../../Reuseable/Modal/Modal'
import Cardpopup from './Cardpopup'
import Giftcardpopup from './Giftcardpopup'
import Template from './Template/Template'
import CreditCard from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';


const Cards = (props) => {
  const {title, btntext, cards, className, cc, gift} = props
  const [modal, setModal] = useState(false)

  const cardsrow = cards?.map(card=> { 
    if(gift) {
      return (
        <Template 
          disabled 
          template={giftcardtemplates.find(x=> x.id === card.template)} 
          from={card.from} 
          amount={card.amount} 
          to={card.touserid}
        />
      ) 
    }
    else {
      const expiry = card.expiration.split('/').join('').replace('  ', '')
      return (
        <div className='card'>
          <CreditCard preview cvc={card.cvc} number={card.cardnumber.replace(/\d{0}(?= \d{4})/g, "****")} expiry={expiry} name='Joshua Bitton'/>
        </div>
      )
    }
  })
  
  return (
    <div className="cards">
      <h4>
        <span>
          <span>{title}</span>
          {!cc&& <small className='graytext'>Total: ${(cards?.reduce((n, {amount}) => n + amount, 0)).toFixed(2)}</small>}
        </span>
        <Appbtn clickEvent={()=> setModal(true)} text={btntext}/>
      </h4>

      <div className="cardsrow templates">
        {cardsrow}
      </div>
      <Modal modal={modal}>
        {cc?
        <Cardpopup setModal={setModal}/>
        :
        <Giftcardpopup setModal={setModal}/>  
      }
      </Modal>
    </div>
  )
}
export default Cards