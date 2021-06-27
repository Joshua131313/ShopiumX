import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import {dashboardlinks} from '../Arrays'
import Navbar from './Navbar/Navbar'
import Home from './Pages/Home/Home'
import './Routes.css'
import Products from './Pages/Products/Products'
import { ContextApp } from '../../../ContextAPI'
import Editproduct from './Pages/Products/Product/Editproduct'
import Giftcards from './Pages/Giftcards/Giftcards'
import Orders from './Pages/Orders/Orders'
import Members from './Pages/Members/Members'
import Ads from './Pages/Ads/Ads'
import Sales from './Pages/Sales/Sales'
import Settings from './Pages/Settings/Settings'
import Promotion from './Pages/Promotion/Promotion'

const Routes = () => {
  const {allproducts} = useContext(ContextApp)
  const components = {
    Home,
    Products,
    Giftcards,
    Orders, 
    Members,
    Ads,
    Sales,
    Settings, 
    Promotion 
  }

  const dashboardlinksroutes = dashboardlinks.map(route=> {

    const Element = components[route.component]
    if(Element) {
      return (
        <Route exact={true} path={`/dashboard${route.link}`}>
            <Element />
        </Route>
      )
    }
  })
  const allproductsroutes = allproducts?.map(product=> {
    return (
      <Route  path={`/dashboard/products/${product.id}`}>
        <Editproduct product={product}/>
      </Route>
    )
  })

  return (
    <div className="routes">
       <Navbar />
        <div className="route">
          <Route path='/dashboard/products/add'>
            <Editproduct add/>
          </Route>

          {allproductsroutes}
          {dashboardlinksroutes}
        </div>
    </div>
  )
}
export default Routes