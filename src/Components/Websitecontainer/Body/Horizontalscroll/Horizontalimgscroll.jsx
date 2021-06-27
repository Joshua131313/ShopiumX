import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './Horizontalimg.css'
import {
  SideBySideMagnifier,
} from "react-image-magnifiers";
const Horizontalimgscroll = (props) => {
  const {imgs} = props
  const imgsrow = imgs?.map(img=> {
    return <>
    <SideBySideMagnifier alwaysInPlace={true}  imageSrc={img}  interactionSettings={{tapDurationInMs: 300}}/>
    <img src={img} alt=""/> 
     </>
  })
  return (
    <div className="imgwrapper">
    <Carousel infiniteLoop swipeable={false}>
      {imgsrow}
    </Carousel>
    </div>

  )
}
export default Horizontalimgscroll