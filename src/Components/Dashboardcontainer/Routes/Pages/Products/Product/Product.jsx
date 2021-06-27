import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextApp } from '../../../../../../ContextAPI'
import Appbtn from '../../../../../Reuseable/Appbtn/Appbtn'
import Deletebtn from './Deletebtn'
import './Products.css'
const Dashboardproduct = (props) => {

  const {product} = props
  const {allproducts} = useContext(ContextApp)

  return (
    <div  className="product dashboardproduct">
      <Link to={`/dashboard/products/${product.id}`} className="productimg">
        <div className="mainimgproductcard">
        <img src={product?.img} alt=""/>
        </div>
      </Link>
      <div className="productinfo">
        <h3>{product.name}</h3>
        <small className="graytext">
          ${product.price}
        </small>
        <div className="productcontrolbtn">
          <Link to={`/dashboard/products/${product.id}`}>
           <Appbtn text='Edit' icon='fal fa-edit' className='reverse'/>
          </Link>
          <Deletebtn name={product.name} id={product.id}/>
        </div>
      </div>
    </div>
  )
}
export default Dashboardproduct