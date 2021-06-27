import React, { useState, useEffect } from 'react'
import Appbtn from '../Appbtn/Appbtn'
import './NextPrevTab.css'
const NextPrevTabs = (props) => {

  const {slides, renderBtn} = props 
  const [slide, setSlide] = useState(0)

  useEffect(()=>{
    setSlide(0)
  },[])
  return (
    <div className="nextprevtab">

      <div className="slides">
        { slides?.map((content, i)=>{
           return (
             <div className={`slidetab ${i === slide?'activeslidetab':''} ${i-1 >= slide?'righttab':i+1<=slide?'lefttab':''}`}>
                {content.content}
             </div>
           )
         })}
      </div>
      <div className="slidesbtn">
      
        <Appbtn 
          className={`prev ${(slides.indexOf(slides[0]) === slide)?'hide':''}`} 
          text='Previous' clickEvent={()=> setSlide(prev=> prev - 1)}  
          icon='fal fa-long-arrow-left'/>
            <Appbtn 
            className={`reverse ${( slides.indexOf(slides[slides.length - 1]) === slide)?'hide':''}`} 
            text='Next' clickEvent={()=> setSlide(prev=> prev+1)} 
            icon='fal fa-long-arrow-right'/>
      </div>
    </div>
  )
}
export default NextPrevTabs