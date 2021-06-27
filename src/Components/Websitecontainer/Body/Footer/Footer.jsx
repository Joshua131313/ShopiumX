import React from 'react'
import Column from './Column/Column'
import './Footer.css'
import {columns} from '../../../../Appconstants'

const Footer = (props) => {

  const columnsrow = columns?.map(column=>{
    return (
      <Column column={column}/>
    )
  })
  const date = new Date()
  return (
    <div className="footer">
     <div className="columns">
      <Column logo/>
        {columnsrow}
     </div>
     <div className="rights">
        <h5 className="graytext">
          <span>
          All Rights Reserved ShopiumX {date.getFullYear()}, made by TurtleDesigns
          </span>
          <small>
            Images are the property of H&M and DIVI ecommerce
          </small>
        </h5>
     </div>
    </div>
  )
}

export default Footer 