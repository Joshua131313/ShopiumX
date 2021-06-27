import React from 'react'

const Products = (props) => {
  const {productsrow, style, grid} = props
  return (
      <div className={`products ${grid&&'gridproducts'}`} style={style}>
        {productsrow}
      </div >
  )
}
export default Products