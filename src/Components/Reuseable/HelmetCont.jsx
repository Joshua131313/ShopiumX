import React from 'react'
import {Helmet} from 'react-helmet'


const HelmetCont = (props) => {
  const {title} = props

  return (
    <Helmet>
      <title>{title} - ShopiumX</title>
    </Helmet>
  )
}
export default HelmetCont