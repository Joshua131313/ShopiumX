import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { convertDateToString, referProduct } from '../../../../../../Appfunctions'
import './Item.css'
const Item = (props) => {

  const {item, allproducts} = props

  return (
    <tr className="item">
      <td>
      <HashLink to={`/website/profile/orders#${item.orderid}`}>
        {item.orderid}
      </HashLink>
      </td>
      <td className='ordereditems'>
        {item?.orderinfo?.products.map(el=>{
          return (
            <span>
              {referProduct(allproducts, el.id)?.name} 
            </span>
          )
        })}
      </td>
      <td>${item?.ordercost?.toFixed(2)}</td>
      <td>{item?.updates[item?.updates.length - 1]?.status}</td>
      <td>{convertDateToString(item?.updates[0]?.date.toDate())}</td>
  </tr> 
  )
}
export default Item