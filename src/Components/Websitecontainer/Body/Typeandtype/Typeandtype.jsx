import React, { useContext } from 'react'
import { ContextApp } from '../../../../ContextAPI'
import Containertype from './Containertype'
import './Typeandtype.css'
const Typeandtype = (props) => {
  const {title, subtitle, type1, img1, link1, type2, img2, link2} = props.info
  const {allproducts} = useContext(ContextApp)
  return (
    <div className="typeandtype">
      <h2>Shop Categories</h2>
      <div className='types'>
        <Containertype limit={12} products={allproducts.filter(x=> x.type === type1)} link={`shop/${link1}`} img={img1} title={type1} subtitle='Products'/>
        <Containertype limit={10} products={allproducts.filter(x=> x.type === type2)} link={`shop/${link2}`} img={img2} title={type2} subtitle='Products'/>
      </div>
    </div>
  )
}
export default Typeandtype