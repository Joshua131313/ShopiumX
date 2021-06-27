import React from 'react'

const Cartcontaineritem = (props) => {
  const {array, title, id, nototal} = props

  return (
    <div className="cartitemcontainer" id={id}>
          
    <div className="cartlegend">
      <div className="leftlegend">
      <h4>Product Details</h4>
      </div>
      <div className="rightlegend">
        <h4 className=''>Quantity</h4>
        <h4 className='pricecont'>Price</h4>
        {!nototal&&<h4 className='total'>Total</h4>}
      </div>
    </div>
    <div className="cartitemsrow">
      {array}
    </div>
  </div>
  )
}
export default Cartcontaineritem