import React, { useEffect, useState } from 'react'
import Slide from './Slide/Slide'
import './Carousel.css'
import {slides} from '../../../Appconstants'
const Carousel = (props) => {
  const [timeduration] = useState(8000)
  const [play, setPlay] = useState(true)
  const [pos, setPos] = useState(0)
  const slidesrow = slides?.map((slide, i)=>{
    return <Slide className={`slide ${slide.class} ${((pos%slides.length)===i)&&'active'}`} slide={slide} pos={pos} />
  })
  const carouselnavrow = slides.map((slide, i)=>{
    return (
      <div className={`carouselitem ${((pos%slides.length)===i)&&'activecarouselitem'}`} onClick={()=>{setPos(i); setPlay(false);setTimeout(()=>{setPlay(true)}, 0)}}>
        <i className="fal fa-dot-circle"></i>
      </div>
    )
  })

  const  [elap, setElap] = useState(0)
  useEffect(()=> {
    setPos(0)
  },[])
  useEffect(()=>{
    let timer
    let elap
    if(play) {
      timer = setInterval(()=>{
        setPos(prev=> prev+1)
        setElap(0)
      }, timeduration)
      elap = setInterval(()=>{
        setElap(prev=> prev +1)
      }, 1)
    }else {
      clearInterval(timer)
      clearInterval(elap)
      setElap(0)

    }
    return() => {
      clearInterval(timer)
      clearInterval(elap)
      setElap(0)
    }
  },[play, timeduration])

  return (
    <div className="carouselbanner">
      {/* <div className="progress">
        <div className="prog" style={{width: (elap*400)/(timeduration)+'%'}}></div>
      </div> */}
      <div className="slides">
       {slidesrow}
      </div>
      <div className="carouselcontrols">
      {carouselnavrow}
        <div className="pause">
          <i onClick={()=>setPlay(!play)} className={play?'fal fa-pause':'fal fa-play'}></i>
        </div>
      </div>
    </div>
  )
}
export default Carousel