import React, {useContext} from 'react'
import { referProduct, convertDateToString } from '../../../../../Appfunctions'
import { ContextApp } from '../../../../../ContextAPI'
import Table from '../../../../Reuseable/Table/Table'
import Item from './Item/Item'

const Container = (props) => {
  const {items} = props
  const {userorders, allproducts} = useContext(ContextApp)
 
  const itemsrow = userorders?.map(item=>{
    return (
      <Item item={item} allproducts={allproducts}/>
    )
  })
  const ths = ['Order ID', 'Items', 'Total', 'Status', 'Order Date']
  const thsrow = ths.map(th=>{
    return <th>{th}</th>
  })
  return (
    <div className='container'>
      <h3>Recent Orders</h3>
      <Table>
        <tr className="containerheader">
         {thsrow}
         </tr>
        {itemsrow}
      </Table>
    </div>
  )
}
export default Container