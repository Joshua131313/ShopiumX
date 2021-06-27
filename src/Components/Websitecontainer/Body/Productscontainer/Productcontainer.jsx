import React, { useContext, useState } from 'react'
import { NavHashLink } from 'react-router-hash-link'
import { genders } from '../../../../Appconstants'
import { ContextApp } from '../../../../ContextAPI'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Skeleton from '../../../Reuseable/Skeleton/Skeleton'
import Product from '../Product/Product'
import './Productcontainer.css'
import Products from './Products'
import Dashboardproduct from '../../../Dashboardcontainer/Routes/Pages/Products/Product/Product'
const Productcontainer = (props) => {
  const {loading} = useContext(ContextApp)
  const {title, link, subtitle, array, filters, nobtn, grid, dashboard} = props
  const [filterkeyword, setFilterkeyword] = useState('All')
 
  const productsrow = array?.filter(x=> ((x.type) === filterkeyword) || (filterkeyword === ('Kids') && ((x.type === 'Girls' || x.type === 'Boys'))) || filterkeyword==='All').map(product=> {
    if(!dashboard) {
      return <Product product={product} products={array}/>
    }
    else {
      return (
        <Dashboardproduct product={product} />
      )
    }
  }) 
  const filtersrow = genders.map(gender=> {
    return (
    <span onClick={()=> setFilterkeyword(gender)} className={`filteritem ${gender===filterkeyword&&'activefilteritem'}`}>
      {gender}
    </span>
    )
  })
  return (
    <div className="projectcontainer">
 
      
     {
       !dashboard &&
       <div className="containertitle">
       <h2>{title}</h2>
       <h4>{subtitle}</h4>
     </div>
     }
      {
        filters &&
        <div className="filters">
        <span onClick={()=> setFilterkeyword('All')} className={`filteritem ${filterkeyword==='All'&&'activefilteritem'}`}>
          All
        </span>
        {filtersrow}
      </div>
      }
      {
        ((loading || array.length===0) && !nobtn)?
        <div className="skeletons">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
        :
        <Products grid={grid} productsrow={productsrow}/>
      }

     {!nobtn && <div className="btn">
        <NavHashLink smooth to={`/website${link}`}>
        <Appbtn className='reverse viewall' text='VIEW ALL' icon='fal fa-chevron-right'/>
        </NavHashLink>
      </div>}
    </div>
  )
}
export default Productcontainer