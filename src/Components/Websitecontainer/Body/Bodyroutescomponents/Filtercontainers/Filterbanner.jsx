import React, { useContext, useEffect, useState } from 'react'
import { colornames, allsizes } from '../../../../../Appconstants'
import Clearchoices from './Clearchoices'
import Filtercol from './Filtercol'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './Filtercontainers.css'
import { ContextApp } from '../../../../../ContextAPI';
import { getRating } from '../../../../../Appfunctions';
const Filterbanner = (props) => {
  const displaycolors = ['maroon', 'blue', 'green', 'yellow', 'orange', 'navy']
  const {setUpdate, allproducts} = useContext(ContextApp)
  const {colors, setColors, sizes, setSizes, price, setPrice, filterorder, setFilterorder, filtered, setFiltered, setPage} = props
  const [showcolors, setShowcolors] = useState(false)
  
  const PushRemoveColor = (values, value, setValue) => {
    if(values.includes(value.toLowerCase())) {
      const index = values.indexOf(value.toLowerCase())
      setValue(values.filter((_, i) => i !== index))
      setPage(0)
    }
    else {
      setValue(prev=> [...prev, value.toLowerCase()])
      setPage(0)
    }
  }
  
  const displaycolorsrow = displaycolors?.map(color=> {
    return (
      <div className={colors.includes(color.toLowerCase())?'colorcont active': 'colorcont'}>
        <span 
        onClick={()=> PushRemoveColor(colors, color, setColors)}
        className='color'
        style={{backgroundColor: color}}></span>
     </div>  
  )
    
  })
  const allcolorrow = colornames?.map(color=> {
    return (
      <div className={colors.includes(color.toLowerCase())?'colorcont active': 'colorcont'}>
        <span 
        onClick={()=> PushRemoveColor(colors, color, setColors)}
        className='color'
        style={{backgroundColor: color}}></span>
     </div>  
    )
  })
  const allsizesrow = allsizes?.map(size=> {
    return (
      <span 
      className={sizes.includes(size.toLowerCase())?"size active":'size'} 
      onClick={()=> PushRemoveColor(sizes, size, setSizes)}>
        {size}
      </span>
    )
  })

  const marks = [
    {
      value: 0,
      label: '$0',
    },
    {
      value: 75,
      label: '$75'
    },
    {
      value: 150,
      label: '$150'
    },
    {
      value: 250,
      label: '$250'
    },
    {
      value: Math.max.apply(Math, allproducts.map((o)=> {return o.price.toFixed(0)})),
      label: '$'+Math.max.apply(Math, allproducts.map((o)=> {return o.price.toFixed(0)}))
    } 
  ]
  const onChange = (e, newValue) => {
    setPrice(newValue)
    setPage(0)
  }
  const sortoptions = [{text: 'Price: Low-High', order: 'cheapest'}, {text: 'Price: High-Low', order: 'expensive'}, {text: 'Customer Rating', order: 'rating'}, {text: '% Off', order: 'sale'}]



  return (
    <div className="filterbanner">
      <Filtercol title='Colors'>
       <span className='colors'>
          {displaycolorsrow}
          <Clearchoices setChoices={setColors}/>
        </span>
        <span className='selectmore' onClick={()=> setShowcolors(true)}>
          <span>+{colornames.length}</span>
        </span>
        <div className={`allcolorsrcont colors ${showcolors?'showcolors':''}`}>
          <h3>
            <span>All Colors</span>
            <i className="fal fa-times" onClick={()=> setShowcolors(false)}></i>
          </h3>
          <div>
           {allcolorrow}
          </div>
        </div>
      </Filtercol>
      <Filtercol title='Sizes'>
         <span className="sizes">
          {allsizesrow}
          <Clearchoices setChoices={setSizes}/>
        </span>
      </Filtercol>
      <Filtercol title='Price'> 
        <span className="slider">
          <Slider marks={marks}
            style={{color: '#000'}}
            onChange={onChange}
            step={5}
            value={price}
            max={marks[marks.length-1]?.value}
           valueLabelDisplay="auto"
           aria-labelledby="range-slider"
          />
        </span>
      </Filtercol>
      <Filtercol title='Sort By'>
        <select value={filterorder} onChange={(e)=> {setFilterorder(e.target.value); setPage(0)}}>
          {
            sortoptions?.map(option=>{
              return (
                <option value={option.order}>{option.text}</option>
              )
            })
          }
        </select>
      </Filtercol>
    </div>
  )
}
export default Filterbanner