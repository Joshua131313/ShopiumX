import React from 'react'
import { HashLink } from 'react-router-hash-link'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Product from '../Product/Product'
import Horizontalscroll from '../Horizontalscroll/Horizontalscroll'

const Containertype = (props) => {
  const {img,title, subtitle, link, products, limit} = props
  const productsrow = products?.slice(0, limit).map((product, i)=> {
    return <Product product={product} key={product.id}/>
  })

  
  return (
   <> <div className={`${title} containertype`}>
      <div className="frame">
        <div className="framecont">
          <h2>{title}</h2>
          <h4>{subtitle}</h4>
          <HashLink to={`/website/${link}`}>
            <Appbtn text={'View Products'} icon='fal fa-chevron-right' className='reverse'/>
          </HashLink>
        </div>
        <img src={img} alt=""/>
      </div>
    </div>
    <Horizontalscroll productsrow={productsrow} />

    </>
  )
}
export default Containertype