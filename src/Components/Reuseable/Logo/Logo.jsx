import React, { useContext } from 'react'
import { HashLink } from 'react-router-hash-link'
import { ContextApp } from '../../../ContextAPI'
import './Logo.css'
const Logo = (props) => {
  const {text='', nolink} = props
  const {logotext} = useContext(ContextApp)
  const Tag = nolink?'span':HashLink
  return (
  <Tag to={'/website'} smooth className="logo">
    <img src="https://i.imgur.com/dkq33Q6.png" alt=""/>
    <span>
      <strong>{logotext?'Checkout':"Shopium"}</strong>
     {!logotext&&<span>X {text}</span>}
    </span>
  </Tag>
  )
} 
export default Logo