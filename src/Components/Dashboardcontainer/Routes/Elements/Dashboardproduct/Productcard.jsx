import React from 'react'
import { Link } from 'react-router-dom'
import { formatMoney, getRating } from '../../../../../Appfunctions'
import Ratings from '../../../../Websitecontainer/Body/Product/Ratings'
import './Product.css'
const Productcard = (props) => {

  const {name, price, reviews, sold, img, id} = props.product

  return (
    <div className="productcarddashboar">
        <div className="prodimgdescrip">
          <div className="imgprod">
             <img src={img} alt=""/>
          </div>
          <div className="descripprod">
              <Link to={`/dashboard/products/${id}`}>
               <h3>{name}</h3> 
              </Link>
              <Ratings readonly rating={getRating(reviews)}/>
          </div>
        </div>
        <div className="prodpsale">
            ${formatMoney(parseFloat(price*sold))}
        </div>
    </div>
  )
}
export default Productcard