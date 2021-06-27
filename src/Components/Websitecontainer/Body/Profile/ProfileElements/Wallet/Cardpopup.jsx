import React, { useContext, useState } from 'react'
import { ContextApp } from '../../../../../../ContextAPI'
import Appbtn from '../../../../../Reuseable/Appbtn/Appbtn'
import Appinput from '../../../../../Reuseable/Appinput/Appinput'
import CreditCardInput from 'react-credit-card-input';
import Creditcardinput from '../../../../../Reuseable/Creditcardinput/Creditcardinput';
import { db } from '../../../../../../Fire';
import firebase from 'firebase'
import Appselect from '../../../../../Reuseable/Appselect/Appselect';
const Cardpopup = (props) => {
  const {setModal} = props
  const {useradresses, user} = useContext(ContextApp)
  const [cardnumber, setCardnumber] = useState(null)
  const [expiration, setExpiration] = useState(null)
  const [cvc, setCvc] = useState(null)
  const [billing, setBilling] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const optionsrow = useradresses?.map((adress, i)=> {
    return (
      <option value={i+1}>{adress.street}, {adress.city}, {adress.country}, {adress.province}</option>
    )
  })
 
  const addPayment = () => {
    if(billing !== 0 && !disabled &&cardnumber &&  cvc && expiration) {
      db.collection('users').doc(user.uid).update({
        cards: firebase.firestore.FieldValue.arrayUnion({
          cardnumber,
          expiration, 
          cvc,
          shipping: useradresses[billing - 1]
        })
      })
      .then(()=> setModal(false))
      .catch(()=> window.alert('Try again later...'))
    }
    else {
      window.alert('Fill out the form!')
    }
  }


  return (
    <div className="creditcardpopup cardpopup">
      <h4>
        <span>Add Credit Card</span>
        <i className='fal fa-times' onClick={()=> setModal(false)}></i>
      </h4>
      <div className="creditinputs">
          <Creditcardinput 
            cardnumber={cardnumber}
            setCardnumber={setCardnumber}
            cvc={cvc}
            setCvc={setCvc}
            expiration={expiration}
            setExpiration={setExpiration}
            setDisabled={setDisabled}
          />
        <Appselect 
          className='checkoutselect'
          value={billing}
          setValue={setBilling}
          optionsrow={optionsrow} 
          defaultoption={{value: 0, text: 'Billing Details'}} />
        <Appbtn text='Add Credit Card' clickEvent={()=> addPayment()}/>
      </div>
    </div>
  )
}
export default Cardpopup
