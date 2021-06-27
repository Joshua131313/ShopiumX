import React from 'react'
import { Link } from 'react-router-dom'
import Loginbtn from './Logininput/Loginbtn'

const Statecontainer = (props) => {
  const {state, setState, text, btntext, clickEvent, icon, loading, text2} = props
  
  
  return (
    <div className="statecontainer">
      <Loginbtn text={btntext} icon={icon} clickEvent={()=>clickEvent()}/>
      <span className='forgottext' >
        <span>
          <i className='fad fa-long-arrow-left' style={{marginRight: '2px'}}></i>
          <Link to='/website'>Back to site</Link>
          </span>
          <span>
           {text2}
          <strong  onClick={()=>setState()} style={{textDecoration: 'underline'}} className='bluehover'>
           {text}
          </strong>
        </span>
      </span>
    </div>
  )
}
export default Statecontainer