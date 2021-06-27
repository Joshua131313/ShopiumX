import React from 'react'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import './Subscribe.css'

const Subscribe = (props) => {
const {img} = props
  return (
    <div className="subscribe" style={{backgroundImage: `url(${img})`}}>
        <div>
          <h3>Get a <strong>$25</strong> discount on your first oder</h3>
          <small className="graytext">Sin up to our Newsletter</small>
          <div>
          <input type="text" placeholder='Subscribe'/>
          <Appbtn text='Sign Up'/>
          </div>
        </div>
    </div>
  )
}
export default Subscribe