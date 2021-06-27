import React from 'react'
import CreditCardInput from 'react-credit-card-input';

const Creditcardinput = (props) => {

  const {
    cardnumber, 
    expiration, 
    cvc, 
    setCardnumber,
    setExpiration,
    setCvc, setDisabled} = props
  
  return (
    <CreditCardInput
      cardNumberInputProps={{ value: cardnumber, onChange: e=> {setCardnumber(e.target.value); setDisabled(false)} }}
      cardExpiryInputProps={{ value: expiration, onChange: e=> {setExpiration(e.target.value); setDisabled(false)} }}
      cardCVCInputProps={{ value: cvc, onChange: e=> {setCvc(e.target.value); setDisabled(false)} }}
      onError={()=> setDisabled(true)}
      fieldClassName="input"
      
    />
  )
}
export default Creditcardinput