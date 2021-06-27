import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import './Body.css'
import Home from './Home/Home'
import { CSSTransition } from 'react-transition-group';
import { db } from '../../../Fire';
import { productsitem } from '../../../Products';
import Quickshop from './Product/Quickshop';
import { referProduct } from '../../../Appfunctions';
import Footer from './Footer/Footer';
import { Route, Switch, useLocation, Link } from 'react-router-dom';
import Productpage from './Product/Productpage/Productpage';
import firebase from 'firebase'
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { alllinks } from '../../../Appconstants';
import Shop from './Bodyroutescomponents/Shop/Shop';
import Viewcart from './Viewcart/Viewcart';
import Lostpage from './404/Lostpage';
import Checkout from './Checkout/Checkout';
import Ordercomplete from './Ordercomplete/Ordercomplete';
import Modal from '../../Reuseable/Modal/Modal';
import Trackorder from './Trackorder/Trackorder';
import Profile from './Profile/Profile';
import HelmetCont from '../../Reuseable/HelmetCont';
import Compare from './Compare/Compare';
import Saved from './Saved/Saved';

const Body = (props) => {
  const location = useLocation()
  const {
    comparetab, quickshopid, 
    allproducts, quickview, 
    breadcrumbs, setBreadcrumbs, 
    filterkeyword,
    handleLogout, setComparetab, 
    showinput} = useContext(ContextApp)
    const orderid = location.search.split('=')[1]
  const collections = [
    {
      text: 'Summer Outfits',
      link: 'summer',
      img: 'https://i.imgur.com/9KuIvBN.jpg'
    },
    {
      text: 'Spring Outfits',
      link: 'spring',
      img: 'https://i.imgur.com/u2ZmQgD.jpg'
    },
    {
      text: 'Accessories',
      link: '/accessories',
      img: 'https://i.imgur.com/DCvuIsU.jpg'
    }
  ]
  const routes = [
    {
      component: 'Viewcart',
      link: '/cart',
      title:'Cart',
      breadlinks: [{text: 'Home', link: 'website'}, {text: 'Cart'}],
      helmet: 'Cart'
    },
    {
      component: 'Saved',
      link: '/saved', 
      title: 'Saved', 
      breadlinks: [{text: 'Hime', link: 'website'}, {text: 'Saved'}],
      helmet: 'Saved'
    }, 
    {
      component: 'Checkout',
      link: '/checkout',
      title: 'Checkout',
      breadlinks: [{text: 'Home', link: 'website'}, {text: 'Checkout'}],
      helmet: 'Checkout'
    },
    {
      component: 'Ordercomplete',
      link: '/ordercomplete',
      title: 'Order Successful', 
      breadlinks: [{text: 'Home', link: 'website'}, {text: orderid}],
      helmet: 'Order Complete'
    },
    {
      component: 'Trackorder',
      link: '/track',
      title: 'Order Tracking',
      breadlinks: [{text: 'Home', link: 'website'}, {text: 'Track'}],
      helmet: 'Tracking'
    },
    {
      component: 'Profile',
      link: '/profile',
      title: 'My Account',
      breadlinks: [{text: 'Home', link: 'website'}, {text: 'My Account', link: 'website/profile'}, ...breadcrumbs],
      helmet: 'My Account'
    }
  ]
  const allroutesrow = routes?.map(route=>{
    const components = {
      Viewcart, 
      Checkout, 
      Ordercomplete,
      Trackorder,
      Profile, 
      Saved
    }
   const Rendercomponent = components[route.component]
    return (
     <Route path={`/website${route.link}`}>
       <HelmetCont title={route.helmet}/>
       {route.breadlinks&&
       <Breadcrumbs link={route.breadlinks} title={route.title}/>
       }
       <Rendercomponent orderid={orderid}/>
     </Route>
    )
  })

  const productsroutes = allproducts?.map(product=> {
    return (
      <Route path={`/website/product/${product.id}`}>
        <Breadcrumbs title={product.name} link={[{text: 'Home', link: 'website'}, {text: 'Product'}, {text: product.id}]}/>
        <Productpage product={product}/>
      </Route>
    )
  })


  const updateProd = () => {
    db.collection('products').doc('products').update({
      products: productsitem
    })
  }
  const pushitem = () => {
    db.collection('products').doc('products').update({
      products: firebase.firestore.FieldValue.arrayUnion(item)
    })
  }

  const routesrow = alllinks?.map(link=> {
    
    return (
      <Route path={`/website${link.link}`}>
        <HelmetCont title='Shop'/>
        <Breadcrumbs 
        title={link.breadcrumbs.title} 
        link={filterkeyword !==''?link.breadcrumbs.link.concat({text: filterkeyword}):link.breadcrumbs.link}/>
        <Shop filterby={link.filterby} filterbytype={link.filterbytype}/>
      </Route> 
    )
  })

 
  return (
   <div className="body" style={quickview?{overflow: 'hidden'}:{}}>
     <Switch>
      <Route exact path='/website'>
        <HelmetCont title='Home'/>
        <Home />
      </Route>
     
      {routesrow}
      {productsroutes}
      {allroutesrow}
      <Route>
        <HelmetCont title='404'/>
        <Lostpage />
      </Route>
     </Switch>
     <Footer />
    <Modal>
      <div></div>
    </Modal>
     <CSSTransition in={quickview} unmountOnExit timeout={300} classNames='quickview'>
        <Quickshop product={referProduct(allproducts, quickshopid)}/>
    </CSSTransition>
    <Modal modal={comparetab} setModal={setComparetab}>
      <Compare />
    </Modal>
    {/* <Modal className='quickview'>
      <Quickshop product={referProduct(allproducts, quickshopid)}/>
    </Modal> */}
  
  </div>
  )
}
export default Body
