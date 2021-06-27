import React from 'react'

const Clearchoices = (props) => {

  const {setChoices} = props

  return (
    <span onClick={()=> setChoices([])} className='clearchoices allcolors'>
      <i className='fal fa-times' ></i>
    </span>
  )
}
export default Clearchoices