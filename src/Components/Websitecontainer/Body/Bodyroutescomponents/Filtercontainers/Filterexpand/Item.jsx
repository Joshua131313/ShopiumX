import React, { useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Item = (props) => {
  const {item, setOptions, state, setState, title} = props
  const [checked, setChecked] = useState(false)
  const handleChange = (e, value) => {
    if(typeof item ==='string'?state.includes(item.toLowerCase()):(state[0]===item[0] && state[1] === item[1])) {
      const index = state.indexOf(typeof item === 'string'?item.toLowerCase():item)
     if(title === 'Price Range') {
      setState([0, Infinity])
     }
     else {
      setState(state.filter((_, i) => i !== index))
     }
    }
    else {
      if(title === 'Price Range') {
        setState(item)
      }
      else {
        setState(prev=> [...prev, (typeof item ==='string'?item.toLowerCase():item)])
      }
    }
  }
  return (
    <FormControlLabel
    control={
      <Checkbox
      style={{color: '#000'}}
      classes={{root: 'custom-checkbox-root'}}
        checked={(typeof item ==='string')?state.includes(item.toLowerCase()):(state[0]===item[0] && state[1] === item[1])}
        onChange={handleChange}
        name="checkedB"
        color="primary"
      /> 
    }
    label={(typeof item === 'string'&& title ==='Colors')?item.split(/(?=[A-Z])/).join(" "):title==='Price Range'?'$'+(item[1] === Infinity?(item[0]+'+'):item.join('-')):item}
  />
  )
}
export default Item
