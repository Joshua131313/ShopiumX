import React, {  useState } from 'react'
import { getColorsBySize } from '../../../../Appfunctions'

const Logicproduct = (props) => {
  const { sizes} = props.product
  const {product, className} = props
  const [size, setSize] = useState(props.product?.sizes[0].size)
  const [color, setColor] = useState('')

  const optionsrow = sizes.map(sizec => {
    return (
      <span className={size === sizec.size?'activeselect':''} onClick={()=> {setColor('');setSize(sizec.size)}}>{sizec.size}</span>
    )
  })
  const colorsrow = getColorsBySize(size, product)?.map(colorc=>{
    return (
      <div 
      onClick={()=> setColor(colorc.color)}
      className={`${colorc.color === color?'active':''} colorcont`}>
        <span className='color' style={{backgroundColor: colorc.color}}>
        </span>
      </div>
    )
  })


  return (
    <div className={`productcontainer ${className?className:''}`}>
      {props.children({
        optionsrow,
        colorsrow,
        size,
        color, 
      })}
    </div>
  )
}
export default Logicproduct