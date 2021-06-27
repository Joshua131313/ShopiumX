import React, { useState } from 'react'
import { SquarePaymentForm, CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton } from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Inputcontainer from './Inputcontainer'
import CreditCardInput from 'react-credit-card-input';

const Squareform = (props) =>{
  const {amount, disabled} = props
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [postalcode, setPostalcode] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [province, setProvince] = useState('')
  const cardNonceResponseReceived = (errors, nonce, cardData, buyerverificationtoken) => {
    if(errors) {
      console.log(errors)
    }
    console.log(buyerverificationtoken)
  }
  const verificationdetail = () => {
    return  {
      amount: amount,
      currencyCode: 'CAD',
      intent: 'CHARGE',
      billingcontact: {
        familyName: lastname,
        givenName: name,
        email: email,
        country: country,
        city: city,
        addressLines: street,
        postalCode: postalcode,
        phone: phone, 
        province: province
      }
    }
  }
  return (
   <>
      <div>
      <Inputcontainer country={country} setCountry={setCountry}
        province={province} setProvince={setProvince}
        name={name} setName={setName}
        lastname={lastname} setLastname={setLastname}
        email={email} setEmail={setEmail} 
        city={city} setCity={setCity}
        street={street} setStreet={setStreet}
        billing={true}
        />
  <SquarePaymentForm
    sandbox={false}
    applicationId={'sq0idp-TzDAz8qSI0U-WaQ-9tZ5rA'}
    locationId={'L9H4PNHSNRKYX'}
    cardNonceResponseReceived={cardNonceResponseReceived}
    createVerificationDetails={verificationdetail}
    >
  <fieldset className="sq-fieldset">
    <CreditCardNumberInput />
    <div className="sq-form-third">
      <CreditCardExpirationDateInput />
    </div>
    <div className="sq-form-third">
      <CreditCardCVVInput />
    </div> 
  
  </fieldset>



  {!disabled?
  <CreditCardSubmitButton>
    Place Order
  </CreditCardSubmitButton>
  :
  <Appbtn text='Place Order' disabled={true}/>
  }
        </SquarePaymentForm>

        <div className="sq-error-message">
          {/* {this.state.errorMessages.map(errorMessage =>
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          )} */}
        </div>

      </div>
    </>
  )
}
export default Squareform