import React from 'react'
import Appinput from '../../../Reuseable/Appinput/Appinput'
import CountryProvinceSelect from './CountryProvinceSelect'

const Inputcontainer = (props) => {
  const {name, setName, 
    lastname, setLastname,
     email, setEmail, 
     company, setCompany, 
     city, setCity, 
     street, setStreet, 
     unit, setUnit, 
     zip, setZip, 
     country, setCountry, 
     province, setProvince,
      billing} = props

  return (
    <div className="inputcontainer">
    <div className="name split">
      <Appinput value={name} setValue={setName} placeholder={'First Name *'} required />
      <Appinput value={lastname} setValue={setLastname} placeholder={'Last Name *'} required/>
    </div>
    <div className="adress">
        <Appinput placeholder={"Email Adress *"}  value={email} setValue={setEmail} required/>
       {!billing&&<Appinput placeholder='Company Name' value={company} setValue={setCompany}/>} 
       <Appinput placeholder='City *' value={city} setValue={setCity} required/>
        <Appinput placeholder='Street Adress *' value={street} setValue={setStreet} required/>
        {!billing&&  
      <div className="split">  
     <Appinput 
        placeholder='Appartment/Unit' 
        value={unit} 
        setValue={setUnit}/>
        <Appinput 
         placeholder='Postal Code/ZIP *'
         value={zip} 
         setValue={setZip}/>
      </div>
    }
      <div className="regioninput">
        <div className="provincecity split">
         <CountryProvinceSelect 
         setCountry={setCountry} 
         country={country} 
         province={province} 
         setProvince={setProvince}/>
        </div>
      </div>
    </div>
  </div>
  )

}
export default Inputcontainer