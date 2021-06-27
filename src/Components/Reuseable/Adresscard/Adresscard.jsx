import React, { useContext, useState } from 'react'
import './Adresscard'
import csc from 'country-state-city'
import './Adresscard.css'
import Modal from '../Modal/Modal'
import Adresspopup from '../../Websitecontainer/Body/Profile/Routescomponents/Adresspopup'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import firebase from 'firebase'

const Adresscard = (props) => {

  const {adress, checkout} = props
  const [modal, setModal] = useState(false)
  const {defaultshipping, user} = useContext(ContextApp)
  const isActive = adress.id === defaultshipping
  const defaultShipping = () => {
    db.collection('users').doc(user.uid).update({
      defaultshipping: adress.id
    })
  }
  const deleteAdress = () => {
    db.collection('users').doc(user.uid).update({
      shippinginfo: firebase.firestore.FieldValue.arrayRemove(adress)
    })
  }
  return (
    <div className={`adresscard ${isActive?'activeadresscard':''}`}>
      <h4>{adress.name} {adress.lastname}</h4>
      <div className="adresscardinfo">
      {adress.company&&  
      <span >Company: {adress.company}</span>
      }
      <span>Email: {adress.email}</span>
      <span>Street: {adress.street}</span>
      <span>City: {adress.city}</span>
      <span>Postal Code/ZIP: {adress.zip}</span>
      <span>Country: {csc.getCountryByCode(adress.country).name}</span>
      {adress.province&&
      <span>Province: {csc.getStateByCode(adress.province).name}</span>
      }
      </div>
      <div className="controls">
        {
          !checkout?
          <>
          <span className='graytext saveforlater' onClick={()=> setModal(true)}>Edit</span>
          <span className='graytext saveforlater' onClick={()=> deleteAdress()}>Delete</span>
          {!isActive&&<span className='graytext saveforlater' onClick={()=> defaultShipping()}>Set as Default</span>}
          </>
          :
          <>
          {!isActive&&<span className='graytext saveforlater' onClick={()=> defaultShipping()}>Select</span>}
          </>
        }
      </div>
      <Modal modal={modal}>
          <Adresspopup 
            setModal={setModal}
            country={adress.country} 
            province={adress.province}
            name={adress.name} 
            lastname={adress.lastname} 
            email={adress.email} 
            company={adress.company} 
            city={adress.city} 
            street={adress.street} 
            unit={adress.unit} 
            zip={adress.zip}
            id={adress.id} 
          />
      </Modal>
    </div>
  )
}
export default Adresscard