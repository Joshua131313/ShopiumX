import React, { useContext, useState } from 'react'
import { ContextApp } from '../../../../../../ContextAPI'
import { db } from '../../../../../../Fire'
import Appbtn from '../../../../../Reuseable/Appbtn/Appbtn'
import Appinput from '../../../../../Reuseable/Appinput/Appinput'
import Giftcard from './Giftcard'
import firebase from 'firebase'
const Giftcardpopup = (props) => {

  const {setModal} = props
  const [amount, setAmount] = useState(0)
  const [img, setImg] = useState('')
  const [message, setMessage] = useState('')
  const [id, setId] = useState('')
  const [fromname, setFromname] = useState('')
  const [template, setTemplate] = useState('')
  const [payment, setPayment] = useState(0)
  const optionsbtn = [5, 10, 15, 20]
  const {cards, user} = useContext(ContextApp)
  const optionsbtnrow = optionsbtn.map(option=> {
    return <Appbtn className={option === amount?'selectedprice':''} text={'$'+option.toFixed(2)} clickEvent={()=> setAmount(option)}/>
  })
  const buyGiftCard = () => {
    if(amount > 5) {
      if(payment !== 0 && fromname && template && id ){
        db.collection('orders').doc('orders').update({
          giftcards: firebase.firestore.FieldValue.arrayUnion({
            amount: parseFloat(amount),
            paid: parseFloat(amount),
            message,
            from: fromname,
            touserid: id, 
            giftcardid: db.collection('users').doc().id,
            date: new Date(),
            template,
            fromuserid: user.uid
          })
        })
        .then(()=>{
          setModal(false)
        })
        .catch(()=>{
          window.alert('Try again later...')
        })
        
      }
    }
    else {
      window.alert('Gift card must be at least $5')
    }
  }
  return (
    <div className="giftcardpopup cardpopup">
      <h4>
        <span>Add Gift Card</span>
        <i className='fal fa-times' onClick={()=> setModal(false)}></i>
      </h4>
      <div className="giftcardinfo">
        <div className="optionsamount">
            {optionsbtnrow}
          <Appinput type='number' value={amount} setValue={setAmount} placeholder={'Custom'}/>
        </div>
        <Giftcard details={{
            amount,
            img,
            fromname,
            id, 
            message, 
            template,
            payment 
          }}
          setAmount={setAmount}
          setImg={setImg}
          setFromname={setFromname}
          setId={setId}
          setTemplate={setTemplate}
          setPayment={setPayment}
          cards={cards}
          buyGiftCard={buyGiftCard}
          setMessage={setMessage}
          />
      </div>
    </div>
  )
}
export default Giftcardpopup