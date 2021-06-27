import React, { useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import './Lostpage.css'
const Lostpage = () => {
  const [position, setPosition] = useState({
    x:  0,
    y: 0
  })


  return (
    <div className="lostpage" onMouseOver={(e)=>{setPosition({x: e.pageX, y: e.pageY});}}>
        <h1>404</h1>
        <HashLink to='/website'>
          <Appbtn text='Return Home'/>
        </HashLink>
    </div>
  )
}
export default Lostpage