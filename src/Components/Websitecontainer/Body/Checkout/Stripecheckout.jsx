import React, { useContext } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { ContextApp } from '../../../../ContextAPI'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'

const  StripeFormCheckout = (props)=> {
const {incart, appliedcodes, allproducts, percentoff} = useContext(ContextApp)
const {totalpricewithtax} = props
  const onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    }); 
  }

  return (
    <StripeCheckout
        amount={1}
        billingAddress={true}
        token={onToken}
        stripeKey='pk_live_51ISGTOEsEEkanyVXwUHikrxSWSqA96IjlquvQ7W1hyXmZo5RhVE217XlBkj7h3eB14dJhq2BYE7V0I1bgxqPzbXd00mOPNoIcO'
      >
       <Appbtn text='Pay with Credit Card'/>
      </StripeCheckout>
  )
}
export default StripeFormCheckout