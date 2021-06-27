import React, { useState } from 'react'
import './Filterexpand.css'
import Item from './Item'

const Filterexpand = (props) => {
  const {list, title, state, setState} = props.col
  const [expand, setExpand] = useState(false)
  
  const listrow = list?.map(el=> {
    if(props.filterby.toLowerCase() !== 'kids' || (el !=='Men' && el !== 'Women' && el !=='Unisex')) {
      return (
        <Item title={title} item={el} state={state} setState={setState}/>
       )
    }
  })
  return (
    <div className={`filterexpand ${expand&&'filterexpandactive'}`}>
      <h3 onClick={()=> setExpand(!expand)}>
        <i className={`fal fa-chevron-right`}></i>
        <span>
        {title+((title!=='Price Range')?` (${state.length})`:'')}
        </span>
    
      </h3>
      <div className={`col expand ${expand&&'expanded'}`}>
        {listrow}
      </div>
    </div>
  )
}
export default Filterexpand