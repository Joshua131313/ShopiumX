import React, { useContext, useState } from 'react'
import { Route } from 'react-router-dom'
import { ContextApp } from '../../../../../ContextAPI'
import { db } from '../../../../../Fire'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Modal from '../../../../Reuseable/Modal/Modal'
import Inputcontainer from '../../Checkout/Inputcontainer'
import firebase from 'firebase'
import Adresscard from '../../../../Reuseable/Adresscard/Adresscard'
import Adresspopup from './Adresspopup'
const Adress = (props) => {
  const {user, useradresses} = useContext(ContextApp)
  const {link} = props
  const [modal, setModal] = useState(false)

  const useradressesrow = useradresses?.map(adress=>{
    return (
      <Adresscard adress={adress} />
    )
  })

  return (
    <div className='innercont'>
      <Appbtn 
       clickEvent={()=> setModal(true)}
       text='Add Adress' 
       className='modalbtn'/>
        <div className="adresses">
          {useradressesrow}
        </div>
       <Modal modal={modal}>
          <Adresspopup 
            add
            setModal={setModal}
            country={''} 
            province={''}
            name={''} 
            lastname={''} 
            email={''} 
            company={''} 
            city={''} 
            street={''} 
            unit={''} 
            zip={''} 
            
          />
       </Modal>
    </div>
  )
}

export default Adress