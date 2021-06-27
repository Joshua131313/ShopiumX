import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../../ContextAPI'
import { countries } from '../../../../Countries'
import csc from 'country-state-city'

const CountryProvinceSelect = (props) => {
  const {province, country, setCountry, setProvince} = props
  const [provinces, setProvinces] = useState([])
  const provincesrow = provinces?.map(province=>{
    return (
      <option selected={false} value={province.isoCode}>{province.name}</option>
    )
  }) 
  const countryrow = countries?.map(country=> {
    return (
      <option value={country.code}>{country.name}</option>
    )
  })
  
  useEffect(()=>{
    
    setProvince('')

  },[provinces])

  useEffect(()=>{ 
    const provs = csc.getStatesOfCountry(country)
    setProvinces(provs)
    if(provs.length === 0) {
      setProvince(true)
    }
  },[country]) 
  return (
    <>
    <select  className='checkoutselect' value={country} onChange={e=> setCountry(e.target.value)}>
      <option  value="">Country *</option>
        {countryrow}
      </select>
     {provincesrow.length?
     <select className='checkoutselect'  value={provinces?.find(x=> x.name === province || x.isoCode === province)?.isoCode} onChange={e=> setProvince(e.target.value)}>
      <option  disabled={false} value='' selected={!province}>Province/State *</option>
      {provincesrow}
    </select>:''}
    </>
  )
}
export default CountryProvinceSelect