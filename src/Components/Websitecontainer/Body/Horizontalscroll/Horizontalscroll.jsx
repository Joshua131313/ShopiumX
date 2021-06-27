import React from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Skeleton from '../../../Reuseable/Skeleton/Skeleton';
import './Horizontalscroll.css'
const Horizontalscroll = (props) => {
  const {productsrow} = props
  
  const Arrow = ({text, className}) => {
    return (
      <i className={className}></i>
    )
  }

  const ArrowLeft = Arrow({text:'', className: 'fal fa-chevron-left'})
  const ArrowRight = Arrow({text:'', className: 'fal fa-chevron-right'})
  return (
   <>
    {
    productsrow.length === 0?
    <>
      <div className="horizontalskeletons">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </>
    :
    <ScrollMenu 
      wheel={false}
      translate={1} 
      data={productsrow} 
      arrowLeft={ArrowLeft} 
      arrowRight={ArrowRight}
      hideSingleArrow={true}
      dragging={true}
      alignCenter={false}
      arrowDisabledClass={'hidearrow'}
      arrowClass='arrow'
    />
    }
   </>
  )

}
export default Horizontalscroll