import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../../../Fire'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Inputcontainer from '../../Checkout/Inputcontainer'
import firebase from 'firebase'
import { ContextApp } from '../../../../../ContextAPI'

const Adresspopup = (props) => {
  const {user, useradresses} = useContext(ContextApp)
  const {setModal, add, id} = props
  const [name, setName] = useState(props.name)
  const [lastname, setLastname] = useState(props.lastname)
  const [email, setEmail] = useState(props.email)
  const [company, setCompany] = useState(props.company)
  const [city, setCity] = useState(props.city)
  const [street, setStreet] = useState(props.street)
  const [unit, setUnit] = useState(props.unit)
  const [zip, setZip] = useState(props.zip)
  const [province, setProvince] = useState(props.province)
  const [country, setCountry] = useState(props.country)
  
  const clearStates = () => {
    setName('')
    setLastname('')
    setEmail('')
    setCompany('')
    setCity('')
    setStreet('')
    setUnit('')
    setZip('')
    setProvince('')
    setCountry('')
  }
  
  const addAdress = () => {
    if(name && email && country && province && city && street  && zip) {
      if(add) {
        const adressobj = {
          name, 
          lastname, 
          date: new Date(),
          email,
          company, 
          city,
          street,
          zip,
          province, 
          country,
          id: db.collection('users').doc().id,
          default: false
        }
        
        db.collection('users').doc(user.uid).update({
          shippinginfo: firebase.firestore.FieldValue.arrayUnion(adressobj)
        })
        .then(()=>{
          setModal(false)
          clearStates()
        })
        .catch(()=>{
          window.alert('Try Again...')
        })
      }
      else {
        useradresses.forEach(el=>{
          if(el.id === id) {
            const index = useradresses.indexOf(el)
            useradresses[index].city = city
            useradresses[index].company = company
            useradresses[index].email = email
            useradresses[index].country = country
            useradresses[index].lastname = lastname
            useradresses[index].name = name
            useradresses[index].province = province
            useradresses[index].street = street
            useradresses[index].zip = zip
            db.collection('users').doc(user.uid).update({
              shippinginfo: useradresses
            })
            .then(()=>{
              setModal(false)
            })
          }
        })
      }
    }
    else {
      window.alert('Fill Out Required Inputs!')
    }
  }

  useEffect(()=>{
    setName(props.name)
    setLastname(props.lastname)
    setEmail(props.email)
    setCompany(props.company)
    setCity(props.city)
    setStreet(props.street)
    setUnit(props.unit)
    setZip(props.zip)
    setProvince(props.province)
    setCountry(props.country)
  },[props])


  return (
    <div className="addadress">
    <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
     <span>{add?"Add An Adress":'Edit Adress'}</span>
     <i className='fal fa-times' onClick={()=> setModal(false)}></i>
     </h3>
    <Inputcontainer 
      country={country} setCountry={setCountry}
      province={province} setProvince={setProvince}
      name={name} setName={setName}
      lastname={lastname} setLastname={setLastname}
      email={email} setEmail={setEmail} 
      company={company} setCompany={setCompany} 
      city={city} setCity={setCity}
      street={street} setStreet={setStreet}
      unit={unit} setUnit={setUnit}
      zip={zip} setZip={setZip}
    />
   <Appbtn text={add?'Add Adress':'Edit Adress'} clickEvent={()=> addAdress()}/>
   </div>
  )
}
export default Adresspopup