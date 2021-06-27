import React, {useContext} from 'react'
import Body from './Body/Body'
import Navbar from './Navbar/Navbar'
import { CSSTransition } from 'react-transition-group';

const Websitecontainer = (props) =>{
  return (
    <div className="website app">
      <Navbar />
      <Body 

      />
    </div>
  )
}
export default Websitecontainer