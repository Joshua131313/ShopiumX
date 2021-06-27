import React, {  useRef } from 'react'

const Searchdropdown = (props) => {
  const {searchproductsrow, setCursor} = props
  const ref = useRef()


  return (
   <> 
    {
      searchproductsrow.length !==0&&
      <div  className="searchdropdown">
      {
        searchproductsrow
      }
      </div>   
    }
  </>
  )
}
export default Searchdropdown