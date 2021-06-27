import React, { useContext, useEffect } from 'react'
import { benefits } from '../../../../Appconstants'
import { ContextApp } from '../../../../ContextAPI'
import Carousel from '../../Carousel/Carousel'
import Benefit from '../Benefits/Benefit'
import Dealoftheday from '../Dealoftheday/Dealoftheday'
import Productcontainer from '../Productscontainer/Productcontainer'
import Subscribe from '../Subscribe/Subscribe'
import Typeandtype from '../Typeandtype/Typeandtype'

const Home = () => {

  const {trendingproduct, newarrivals, allproducts} = useContext(ContextApp)

  const benefitsrow = benefits.map(benefit=> {
    return <Benefit benefit={benefit}/>
  })


  return (
    <div className='home'>
    <Carousel/>
    <Typeandtype info={{
      title: 'Men and Women',
      subtitle: 'Shop men and women clothing!',
      type2: 'Men',
      link2: 'men',
      img2: 'https://i.imgur.com/O9BRrNL.jpg',
      type1: 'Women',
      link1: 'women',
      img1: 'https://i.imgur.com/J1K8pVr.jpg'
    }}/>

   <Dealoftheday expires={new Date(2021, 8, 30)} product={allproducts.filter(product=> product.id === 'IxRD812322tOskHQoCMejK1H')[0]}/>
   <div className="benefits">
      {benefitsrow}
    </div>
   <Productcontainer
    array={trendingproduct}
    title='Summer 2021 Trends' 
    link='/trends'
    subtitle={'Discover our latest fashion trends for the summer!'}/>
    {/* <Collections 
    collections={collections}
    subtitle='Discover our latest collections for all seasons'
    title='Shop Collections'/> */}
    <Subscribe img='https://i.imgur.com/snItuvr.jpg'/>

    <Productcontainer 
    array={newarrivals}
    link='/new-arrivals'
    filters
    title='New Arrivals'
    subtitle='Shop popular and new arrivals from ShopiumX'
    />

    </div>
  )
}
export default Home