import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { ContextApp } from '../../../../../ContextAPI'
import Appinput from '../../../../Reuseable/Appinput/Appinput'
import Trackorder from '../../Trackorder/Trackorder'
import Container from '../ProfileElements/Container'

const Details = (props) => {
  const {setBreadcrumbs} = useContext(ContextApp)
  const {link} = props
 
  useEffect(()=> {
    setBreadcrumbs(prev=> [{text: 'Overview', link: 'website/profile'}])
  },[])

  return (
    <div className='innercont'>
        <Container />
        <Trackorder />
    </div>
  )
}

export default Details