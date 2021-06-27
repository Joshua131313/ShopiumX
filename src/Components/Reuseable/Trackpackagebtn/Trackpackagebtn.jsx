import React, { useState } from 'react'
import Trackordermodal from '../../Websitecontainer/Body/Trackorder/Trackordermodal'
import Appbtn from '../Appbtn/Appbtn'

const Trackpackagebtn = (props) => {
  const {order} = props
  const [modal, setModal] = useState(false)

  return (
    <>
    <Trackordermodal modal={modal} setModal={setModal} order={order}/>
    <Appbtn text='Track Package' className='blue' clickEvent={()=> setModal(true)}/>
    </>
    )
}
export default Trackpackagebtn