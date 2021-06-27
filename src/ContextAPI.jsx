import React, { createContext, useEffect, useRef, useState } from 'react'
import firebase from 'firebase'
import { db } from './Fire'
import SalesTax from 'sales-tax'
import axios from 'axios'
import csc from 'country-state-city'
import { addNotification } from './Components/Reuseable/Addnotification/Addnotification'
import { logger } from './Appfunctions'
export const ContextApp = createContext()

const ContextAppProvider = props => {
  const [scrolled, setScrolled] = useState(false)
  const notifisystem = useRef()
  const [keyword, setKeyword] = useState('')
  const refe = useRef()
  

  const [showinput, setShowinput] = useState(false)
  const [update, setUpdate] = useState(1)
  const [cartcontscrolled, setCartcontscrolled] = useState(false)
  const user = firebase.auth().currentUser
  const [cart, setCart] = useState(false)
  const [search, setSearch] = useState(false)
  const [menu, setMenu] = useState(false)
  const [allproducts, setAllproducts] = useState([])
  const [menproduct,setMenproduct] = useState([])
  const [womenproduct, setWomenproduct] = useState([])
  const [kidsproduct, setKidsproduct] = useState([])
  const [trendingproduct, setTrendingproduct] = useState([])
  const [newarrivals, setNewarrivals] = useState([])
  const [loading, setLoading] = useState(true)
  const [incart, setIncart] = useState([])
  const [cartposition, setCartposition] = useState({
    right: null
  })
  const [quickview, setQuickview] = useState(false)
  const [quickshopid, setQuickshopid] = useState('')
  const [saved, setSaved] = useState([])
  const [orders, setOrders] = useState([])
  const [compared, setCompared] = useState([])
  const [comparetab, setComparetab] = useState(false)
  const [filterkeyword, setFilterkeyword] = useState('')
  const clean = text => text.replace(/[^a-zA-Z0-9 ]/g, "");
  const pattern = new RegExp('\\b' + clean(filterkeyword), 'i');
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [promotioncode, setPromotioncode] = useState('')
  const [coupon, setCoupon] = useState('')
  const [appliedcodes, setAppliedcodes] = useState([])
  const [percentoff, setPercentoff] = useState(0)
  const [logotext, setLogotext] = useState('')
  const [locateuser, setLocateuser] = useState(false)
  const [rate, setRate] = useState(0)
  const [province, setProvince] = useState('')
  const [country, setCountry] = useState('')
  const [provinces, setProvinces] = useState([])
  const [orderid, setOrderid] = useState('')
  const [savedforlater, setSavedforlater] = useState([])
  const [userorders, setUserorders] = useState([])
  const [useradresses, setUseradresses] = useState([])
  const [defaultshipping, setDefaultshipping] = useState('')
  const [cards, setCards] = useState([])
  const [giftcards, setGiftcards] = useState([])
  const [allgiftcards, setAllgiftcards] = useState([])
  const [userinfo, setUserinfo ] = useState({})
  const [dashboardusers, setDashboardusers] = useState([])
  const [allusers, setAllusers] = useState([])
  const [darkmode, setDarkmode] = useState(false)
  const [promotions, setPromotions] = useState([])
  const [googleads, setGoogleads] = useState(false)
  const [template, setTemplate] = useState({})
  const couponcode = {code: promotions[0]?.promotion, discount: promotions[0]?.percent}

  const initializeLocalStorageStates = () => {
    setIncart(JSON.parse(localStorage.getItem('incart')) || [])
    setSaved(JSON.parse(localStorage.getItem('saved')) || [])
    setCompared(JSON.parse(localStorage.getItem('compared')) || [])
    setSavedforlater(JSON.parse(localStorage.getItem('savedforlater')) || [])
    setUserorders(JSON.parse(localStorage.getItem('orders')) || [])
  }

  const addNoti = (msg, icon) => {
    addNotification({
      notifisystem,
      msg, 
      icon
    })
  }
  useEffect(()=>{
    db.collection('products').doc('products').onSnapshot(snap=> {
      const products = snap.data().products
      setAllproducts(products)
      setMenproduct(products.filter(x=> x.type ==='Men'))
      setWomenproduct(products.filter(x=> x.type ==='Women'))
      setKidsproduct(products.filter(x=> x.type ==='Kids'))
      setTrendingproduct(products.filter(x=> x.season ==='Trending'))
      setNewarrivals(products.slice(0, 10)) 
      setLoading(false) 
    })
    db.collection('dashboard').doc('dashboard').onSnapshot(snap=> {
      const data = snap.data()
      setGoogleads(data.settings.googleads)
      setPromotioncode(data.settings.promotions)
      setTemplate(data.settings.template)
      setPromotions(data.settings.promotions)
    })
    db.collection('orders').doc('orders').onSnapshot(snap=>{
      const ordersdata = snap.data()
      setOrders(ordersdata.orders)
      setAllgiftcards(ordersdata.giftcards)
      if(user) {
        setUserorders(ordersdata.orders.filter(x=> x.userid === user.uid))
        setGiftcards(ordersdata.giftcards.filter(x=> x.touserid  === user.uid))
      }
    })
    db.collection('allusers').doc('allusers').onSnapshot(snap=> {
      const data = snap.data()
      setAllusers(data.users)
      setDashboardusers(data.allowedusers)
    })
    if(user) {
      db.collection('users').doc(user.uid).onSnapshot(snap=>{
        const userdata = snap.data()
        setIncart(userdata.cart)
        setSaved(userdata.saved)
        setCompared(userdata.compared)
        setSavedforlater(userdata.saveforlater)
        setUseradresses(userdata.shippinginfo)
        setDefaultshipping(userdata.defaultshipping)
        setCards(userdata.cards)
        setUserinfo(userdata.userinfo)
        setDarkmode(userdata.customization.darkmode)
      })
     }
     else {
      initializeLocalStorageStates()
      }

  },[user])
  const handleLogout = () =>{   
    firebase.auth().signOut()
    window.location.reload()
    initializeLocalStorageStates()
  }
  useEffect(()=>{
    (!user) && localStorage.setItem('incart', JSON.stringify(incart))
  },[incart])
  useEffect(()=>{
    (!user ) && localStorage.setItem('saved', JSON.stringify(saved))
   
  },[saved])
  useEffect(()=>{
    (!user ) && localStorage.setItem('compared', JSON.stringify(compared))
  },[compared])
  useEffect(()=>{
    (!user) && localStorage.setItem('savedforlater', JSON.stringify(savedforlater))
  }, [savedforlater])

  useEffect(()=>{
    (!user) && localStorage.setItem('orders', JSON.stringify(userorders))
   },[userorders]) 

  useEffect(() => {
    if(locateuser) {
      axios({
        method: 'get', 
        url: `https://extreme-ip-lookup.com/json/`,
      }).then((res) => {
       setCountry(res.data.countryCode)
       setProvince(res.data.region) 
      })
    }
  },[locateuser])
  useEffect(()=>{
    logger.disableLogger()
  },[])
  useEffect(()=>{ 
    
      setProvinces(csc.getStatesOfCountry(country))
  },[country]) 
  useEffect(()=>{ 
    const  prov = provinces?.find(x=> x.name === province || x.isoCode === province)?.isoCode
    if(prov){
      SalesTax.getSalesTax(country, prov).then(tax=>{
        setRate(tax.rate) 
     })
    }
  },[province, country, provinces]) 


  
  return <ContextApp.Provider 
      value={{ 
      scrolled, setScrolled,
      notifisystem,
      keyword, setKeyword,
      handleLogout, 
      refe, couponcode,
      search, setSearch,
      cart, setCart,
      user, menu, 
      setMenu, setMenproduct, menproduct,
      womenproduct, setWomenproduct,
      kidsproduct, setKidsproduct,
      trendingproduct, setTrendingproduct,
      newarrivals, setNewarrivals,
      loading, allproducts, setAllproducts,
      incart, setIncart,
      cartposition, setCartposition,
      saved, setSaved, orders,
      cartcontscrolled, setCartcontscrolled,
      compared, setCompared,
      comparetab, setComparetab,
      setQuickshopid, quickview, setQuickview,
      quickshopid, filterkeyword, setFilterkeyword,
      pattern, clean, showinput, setShowinput,
      breadcrumbs, setBreadcrumbs, update, setUpdate,
      promotioncode, setPromotioncode,
      coupon, setCoupon, appliedcodes,
      setAppliedcodes, percentoff, setPercentoff,
      logotext, setLogotext,
      locateuser, setLocateuser, country, province, setCountry, setProvince,
      provinces, setProvinces, rate, setRate, orderid, setOrderid,
      savedforlater, setSavedforlater, setUserorders,
      userorders, useradresses, defaultshipping,
      cards, giftcards, allgiftcards, setAllgiftcards,
      userinfo, dashboardusers, allusers, darkmode,
      addNoti, googleads, setGoogleads, promotions,
      setPromotions, template
  }}>
      {props.children}
  </ContextApp.Provider>
}
export default ContextAppProvider