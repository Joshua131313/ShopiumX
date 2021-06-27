import React, { useContext } from 'react'
import { links, links2 } from '../../../../Appconstants'
import { ContextApp } from '../../../../ContextAPI'
import Logo from '../../../Reuseable/Logo/Logo'
import Navbarlink from '../Navbarlink/Navbarlink'
import Search from './Search'

const Navleft = (props) => {
  const {filterkeyword, setFilterkeyword, showinput, setShowinput} = useContext(ContextApp)
  const linksrow = links?.map(link=>{
    return  <Navbarlink noicon link={link}/>
  })
  const links2row = links2?.map(link=>{
    return <Navbarlink noicon link={link} />
  })
  // pattern.test(clean(x.name))




  return (
    <div className={`left`}>
      <div className='leftcont'>
        <div className="navlinks">
          {links2row}
        </div>
          <Logo />
          <div className="navlinks">
              {linksrow}
          </div>
      </div>
      </div>

  )
}
export default Navleft