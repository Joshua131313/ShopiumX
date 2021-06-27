import React, { useContext, useEffect } from 'react'
import { giftcardtemplates } from '../../../../../../Appconstants'
import { ContextApp } from '../../../../../../ContextAPI'
import Appbtn from '../../../../../Reuseable/Appbtn/Appbtn'
import Appinput from '../../../../../Reuseable/Appinput/Appinput'
import Appselect from '../../../../../Reuseable/Appselect/Appselect'
import Googlepay from '../../../../../Reuseable/Googlepay/Googlepay'
import Logo from '../../../../../Reuseable/Logo/Logo'
import NextPrevTabs from '../../../../../Reuseable/NextPrevTabs/NextPrevTabs'
import Cardinforow from './Cardinforow'
import './Giftcard.css'
import Template from './Template/Template'
const Giftcard = (props) => {
  const {
    details,
    setAmount,
    setFromname,
    setId,
    setMessage,
    setTemplate,
    setPayment,
    cards,
    buyGiftCard
  } = props
  
  const optionsrow = cards?.map((card, i)=> {
    return (
      <option value={i+1}>Card Ending In: {card.cardnumber.toString().replace(/.(?=.{4})/g, '*')}</option>
    )
  })

  const slides = [
    {
      content: <>
      <Logo text='Gift Card' nolink/>
      <Cardinforow title='From' placeholder='Name' value={details.fromname} setValue={setFromname}/>
      <Cardinforow title='Recepient User ID' placeholder='ID' value={details.id} setValue={setId}/>
      <Cardinforow type='number' title='Amount' placeholder='Amount' value={details.amount} setValue={setAmount}/>
      <Cardinforow title='Message' placeholder='Message' value={details.message} setValue={setMessage}/>
      </>
    },
    {
      content: <>
      <div className="secondslide">
          <h3>Select a Template</h3>
          <div className="templates">
            {giftcardtemplates.map(template=> {
              return <Template to={details.id} amount={details.amount} from={details.fromname} setTemplate={setTemplate} selectedtemplate={details.template} template={template}/>
            })}
          </div>
      </div>
      </>
    },
    {
      content: <>
      <div className="confirmation">
        <h3>Payment</h3>
        <Appselect defaultoption={{value: 0, text: 'Payment'}} optionsrow={optionsrow} setValue={setPayment} value={details.payment}/>
        <Appbtn text='Buy Gift Card' clickEvent={()=> buyGiftCard()}/>
        <Googlepay />
      </div>
      </>
    }
  ]


  return (
    <div className={"giftcard"}>
     <NextPrevTabs slides={slides}/>
    </div>
  )
}
export default Giftcard