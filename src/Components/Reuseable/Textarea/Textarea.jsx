import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import './Textarea.css'
const Textarea = (props) => {
  const {value, setValue, placeholder, disabled=false} = props
  return (
   <div className="textareacont">
      <TextareaAutosize disabled={disabled} required  onChange={(e)=>  setValue(e.target.value)} value={value} />
      <span>{placeholder}</span>
   </div>
  )
}
export default Textarea