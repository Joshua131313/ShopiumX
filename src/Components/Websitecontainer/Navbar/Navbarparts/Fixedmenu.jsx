import React, { useContext } from 'react'
import {   alllinks } from '../../../../Appconstants'
import { ContextApp } from '../../../../ContextAPI'
import Logo from '../../../Reuseable/Logo/Logo'
import Navbarlink from '../Navbarlink/Navbarlink'
import Search from './Search'

const Fixedmenu = () => {
  const {menu, setMenu} = useContext(ContextApp)
  
  const alllinksrow = alllinks.map(link=> {
    return (
      <Navbarlink link={link} setMenu={setMenu}/>
    )
  })

  return (
  <div className={`fixedmenu ${menu?'fixedmenuactive':''}`}>
    <Logo />
    <div className="fixedmenulinks">
      <Search className='fixedsearch' setMenu={setMenu}/>
    
      {alllinksrow}
    </div>
  </div>
  )
}
export default Fixedmenu