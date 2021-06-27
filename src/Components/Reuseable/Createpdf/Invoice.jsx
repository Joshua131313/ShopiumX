import React, { useContext, useEffect } from 'react'
import { getDiscountDollarFromCode, sumCost, totalPrice } from '../../../Appfunctions'
import { ContextApp } from '../../../ContextAPI'
import Logo from '../Logo/Logo'
import Invoiceproduct from './Invoiceproduct'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const Invoice = (props) => {
  const {order, invoiceref} = props
  const {allproducts} = useContext(ContextApp)
  const tablerows =  order?.orderinfo.products.map(item=> {
    return (
     <Invoiceproduct item={item}/>
    )
  })


  return (
    <Document>
        <Page size="A4" >
    <div className="invoice" id='invoice' ref={invoiceref}>
      <div className="uppersection">
      <div className="invoiceheader">
        <Logo />
        <h2>INVOICE</h2>
      </div>
      <div className="invoicedata">
          <div className="leftdata">
            <span>Mackle 8712</span>
            <span>Montreal, Quebec, H4W3E7</span>
            <span>shopiumx@info.com</span>
            <a href='https://xmzrv.csb.app/'>https://xmzrv.csb.app/</a>
          </div>
          <div className="rightdata">
            <span>
              <span>Date:</span>
              <span>{new Intl.DateTimeFormat('en-US').format(order?.date.toDate())}</span>
            </span>
            <span>
              <span>Order ID:</span>
              <span>{order?.orderid}</span>
            </span>
          </div>
      </div>
      <div className="ship">
         <h4>SHIP TO</h4>
         <div>
           <span>{order?.shippinginfo.name} {order?.shippinginfo.lastname}</span>
           {order?.shippinginfo.company&&
           <span>{order?.shippinginfo.company}</span>
           }
           <span>{order?.shippinginfo.street}</span>
           <span>{order?.shippinginfo.city}, {order?.shippinginfo.country},{order?.shippinginfo.province}, {order?.shippinginfo.zip} </span>
           <span>{order?.shippinginfo.street}</span>
         </div>
      </div>
      </div>
      <div className="lowersection">
          <table>
            <tr>
              <th>Product</th>
              <th>Color</th>
              <th>Size</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
           {tablerows}
          </table>
          <div className='invoicepricetotal'>
           <div>
              <span>Subtotal:</span>
               <span>${totalPrice(order?.orderinfo.products, allproducts, [], 0)}</span>
           </div>
           <div>
             <span>Coupons:</span>
             <strong>${(order?.couponsused?.reduce((acc, {discount})=> 
             (acc+discount), 0))}.00
             </strong>
           </div>
           <div>
             <span>Discount:</span>
             <span>${order?.percentoff}.00</span>
           </div>
           <div>
             <span>Shipping:</span>
             <span>${order?.selectedshipping.price}.00</span>
           </div>
           <div>
             <span>Taxes:</span>
             <span>{(order?.rate*100)?.toFixed(0)}%</span>
           </div>
           <div>
             <span>Total:</span>
             <span>${order?.ordercost.toFixed(2)}</span>
           </div>
          </div>
      </div>
    </div>
    </Page>
    </Document>
  )
}
export default Invoice
