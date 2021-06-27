import React from 'react'
import { NavHashLink } from 'react-router-hash-link'
import './Collection.css'
const Collection = (props) => {
  const {img, text, link} = props.collection
  
  return (
    <NavHashLink to={`/website/${link}`} className="collection" style={{backgroundImage: `url(${img})`}}>
      <div className='collectiontext'>
        <h3>{text}</h3>
        <div>
          <span className='hr'></span>
          <span>Shop Now</span>
        </div>
      </div>
    </NavHashLink>
  )
}
export default Collection