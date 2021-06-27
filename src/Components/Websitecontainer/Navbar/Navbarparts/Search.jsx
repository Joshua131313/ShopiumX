import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ContextApp } from '../../../../ContextAPI';
import Appbtn from '../../../Reuseable/Appbtn/Appbtn';
import Searchproduct from '../../Body/Product/Searchproduct/Searchproduct';

const Search = (props) => {
  const [show, setShow] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [limit, setLimit] = useState(6)
  const [cursorlink, setCursorlink] = useState('')
  const history = useHistory()
  const searchbtnref = useRef()
  const {filterkeyword, setFilterkeyword, allproducts, pattern, clean, setShowinput, setBreadcrumbs} = useContext(ContextApp)
  const {className, setMenu} = props
  const searchref = useRef()
  const filterref = allproducts?.filter(x=> (pattern.test(clean(x.name))|| (filterkeyword.toLowerCase() === x.id.toLowerCase())) && filterkeyword !=='')
  .slice(0, limit)

  const searchproductsrow =  
  filterref.map((product, i)=> { 
    return <Searchproduct setShowinput={setShowinput} setMenu={setMenu} setFilterkeyword={setFilterkeyword} setShow={setShow} i={i} setCursor={setCursor} cursor={cursor} setCursorlink={setCursorlink} activeClassName={cursor === i&&'activeresult'} product={product}/>
  })
  const handleClickOut = (e) => {
    if(searchref.current && !searchref.current.contains(e.target)) {
      setShow(false)
    }
  }

  const clearStates = ()=>{
    setShow(false)
    setShowinput(false)
    setMenu && setMenu(false)
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13 ) {
      if(filterref.length !==0 && cursorlink !==''){
        history.push(`/website/product/${cursorlink}`)
        clearStates()
        setFilterkeyword('')
      }
      else {
        history.push({
          pathname: `/website/shop`,
          search: `?search=${filterkeyword}`
        })
        clearStates()
        searchbtnref.current.click()
      }
    }
    if(e.keyCode === 38 && cursor>0) {
      setCursor(prev=> prev - 1)
    }
    else if(e.keyCode === 40 && cursor <filterref.length - 1) {
      setCursor(prev=> prev + 1)
    }
  }
  useEffect(()=>{
    document.addEventListener('click', handleClickOut)
    return ()=> { 
      document.removeEventListener('click', handleClickOut)
    }
  },[])
  return (
   <div className={className} ref={searchref} >

        <input 
        type="text" 
        onFocus={(e) => { setShow && setShow(true); e.stopPropagation()}}
        onKeyDown={(e)=> {handleKeyDown && handleKeyDown(e)}}
        value={filterkeyword} 
        onChange={(e)=>{ setFilterkeyword(e.target.value); setCursor && setCursor(0)}}
        placeholder='Search...'
      />

      <HashLink
      ref={searchbtnref} 
      onClick={()=> {setMenu && setMenu(false); setShowinput(false)}} 
      to={`/website/shop?search=${filterkeyword}`}>
        <Appbtn icon='fal fa-search' />
      </HashLink>
       {
      (searchproductsrow.length !==0 && show) &&
        <div  className="searchdropdown" onMouseOver={()=> setShow(true)}>
         {
        searchproductsrow
        }
      </div>   
        }
  </div>
  )
}
export default Search