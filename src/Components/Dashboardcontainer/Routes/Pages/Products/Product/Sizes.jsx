import React, { useEffect, useState } from 'react'
import { allsizes, colornames, allsizesstength } from '../../../../../../Appconstants'
import { sortSizes } from '../../../../../../Appfunctions'
import AccordionTab from '../../../../../Reuseable/Accordion/Accordion'
import Appinput from '../../../../../Reuseable/Appinput/Appinput'

const Sizes = (props) => {

  const {sizes, setSizes} = props
  const handleChange = (e, size, color) => {
    const number = parseFloat(e.target.value)
    let tempState = [...sizes]
    const sizeExists = sizes?.some(x=> x.size === size)

    if(sizeExists){
      const colorExists = sizes.find(x=> x.size === size).colors.some(x=> x.color.toLowerCase() === color.toLowerCase())
      if(colorExists) {
          let indexOfSize =tempState.findIndex(x => x.size === size);
          let indexOfColor=tempState[indexOfSize].colors.findIndex(x => x.color.toLowerCase() ===color.toLowerCase())
          if(isNaN(number)) {
              tempState[indexOfSize].colors.splice(indexOfColor, 1)
          }
         else {
             tempState[indexOfSize].colors[indexOfColor].stock = number
         }
        
      }
     else {
     let indexOfSize =tempState.findIndex(x => x.size ===size);
     tempState[indexOfSize].colors.push({color:color,stock: number})
     }
    }
     //if size does not exist
     else {
     tempState.push({size:size, colors: [{color:color, stock: number}]})
     }

    setSizes(sortSizes(tempState.filter(x=> x.colors.some(el=> el.stock))))  
  }


  const allsizesrow = allsizes.map(size=> {
    return (
      <span className={sizes.some(x=> x.size === size)?'editsize selectededitsize':'editsize'}>
        <AccordionTab title={size}>
          <div className="colors">
            {
              colornames.map(color=> {
    
                return (
                  <div className='sizelabel'>
                    <span>{color}:</span>
                      <input 
                         min={0}
                         onChange={(e)=> handleChange(e, size, color)}
                         value={sizes?.find(x=> x.size === size)?.colors.find(x=> x.color === color.toLowerCase())?.stock}
                         type="number" 
                         placeholder='Stock'
                      />
                  </div>
                )
              })
            }
          </div>
        </AccordionTab>
    </span>
    )
  })



  console.log(sizes)
  return (
    
    <div className="editsizes">
      <h3>Sizes</h3>
      <div className="innereditsizes">
        <span className="small editsizecolors">
            {allsizesrow}
        </span>
      </div>
    </div>
  )
}
export default Sizes