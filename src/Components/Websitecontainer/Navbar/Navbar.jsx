import React, { useEffect ,useContext, useState } from 'react'
import './Navbar.css'
import { ContextApp } from '../../../ContextAPI';
import Deal from './Deal';
import Navbarcontainer from './Navbarcontainer';
import Fixedmenu from './Navbarparts/Fixedmenu';
import { CSSTransition } from 'react-transition-group';
import Search from './Navbarparts/Search';

const Navbar = (props) => {
  const [showdeal, setShowdeal] = useState(true)
  const {setScrolled, scrolled, showinput, setShowinput, promotions} = useContext(ContextApp)
  function handleScroll() {
    if(window.scrollY > 49.2) {
      setScrolled(true)
    }
    else {
      setScrolled(false)
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
  },[])
  
  return (
   <>
   <div id="top"></div>
   <i 
   onClick={()=> window.scrollTo(0, 0)}
   className={`fal fa-chevron-up scrollupicon ${scrolled?'activescrollupicon':''}`}></i>
    {
    (showdeal && promotions.length >=1) &&
    <Deal setShowdeal={setShowdeal} couponcode={promotions[0]}/>
    }
    <Fixedmenu />
    <Navbarcontainer scrolled={scrolled}/>
    <div className="height"></div>

    <CSSTransition 
      in={showinput} 
      unmountOnExit 
      timeout={300}
      classNames='searchwindow'
      >
        <div className="searchwindow">
           <i className='fal fa-times' onClick={()=> setShowinput(false)}></i>
           <Search />
        </div>
      </CSSTransition>
   </>
  )
}
export default Navbar