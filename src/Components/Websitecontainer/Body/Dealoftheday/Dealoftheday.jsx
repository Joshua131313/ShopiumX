import React from 'react'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import './Dealoftheday.css'
import Timerbox from './Timerbox'
import Countdown from 'react-countdown';
import { HashLink } from 'react-router-hash-link'
import Price from '../Product/Price'

const Dealoftheday = (props) => {
  const {product, expires} = props

  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if(completed) {
      return <span>Sale Expired</span>
    }
    else {
      return (
        <>
        <Timerbox text='Days' time={days}/>
        <Timerbox text='Hours' time={hours}/>
        <Timerbox text='Minutes' time={minutes}/>
        <Timerbox text='Seconds' time={seconds}/>
        </>
      )
    }
  }

  return (
    <div className="dealoftheday">
        <div className="dealcont">
        <div className="title">
          <h1>Deal Of The Day</h1>
        </div>
          <div className="dealinfo">

              <div className="cont">
                <p className='name'>{product?.name}</p>
                <Price product={product} sale/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur doloribus ut at! Commodi corporis dicta, tempore aliquid saepe voluptates deleniti.</p>
                <HashLink to={`/website/product/${product?.id}`}>
                <Appbtn text='Shop Now' icon='fal fa-chevron-right' className='reverse'/>
                </HashLink>
              </div>
              <div className="timer">
                <Countdown date={expires} renderer={renderer}/>
              </div>
          </div>
        </div>
        <div className="dealimg">
          <img src={product?.img} alt=""/>
        </div>
    </div>
  )
}
export default Dealoftheday