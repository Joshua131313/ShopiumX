import React from 'react'
import { Link } from 'react-router-dom'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import './Slide.css'

const Slide = (props) => {
  const {title, subtitle, link, img, btntext, img2} = props.slide
  const {className} = props
  
  return (
    <div className={className}>
      {
        img2&& 
        <div className="img2">
          <img src={img2} alt="" />
        </div>
      }
      <div className="slidecont">
       <div className='slidetitles'>
       <h3>{subtitle}</h3>
        <h1>{title}</h1>
       </div>
        <Link to={'/website/'+link}>
          <Appbtn text={btntext} icon='fal fa-chevron-right'/>
        </Link>
      </div>
      <img src={img} alt=""/>
    </div>
  )
}
export default Slide