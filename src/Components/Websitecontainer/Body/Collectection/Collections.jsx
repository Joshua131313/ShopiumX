import React from 'react'
import Collection from './Collection'
import './Collections.css'
const Collections = (props) => {
  const {title, subtitle, collections} = props

  const collectionsrow = collections?.map(collection=>{
    return <Collection collection={collection}/>
  })

  return (
    <>
    <div className="collectcontainer">
     <div className="collectionttitle">
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
     </div>
    <div className="collections">
         {collectionsrow}
      </div>
    </div>
      </>
  )
}
export default Collections