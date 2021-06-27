import React, { useContext, useEffect, useState } from 'react'
import { placeOrder, totalPrice, totalPriceWithTax } from '../../../../Appfunctions'
import { ContextApp } from '../../../../ContextAPI'
import './Checkout.css'
import Checkoutcontainer from './Checkoutcontainer'
import Appinput from '../../../Reuseable/Appinput/Appinput'
import Couponcontainer from '../Viewcart/Couponcontainer'
import Textarea from '../../../Reuseable/Textarea/Textarea'
import Checkoutiteminfo from './Checkoutiteminfo'
import StripeFormCheckout from './Stripecheckout'
import { db } from '../../../../Fire'
import { PayPalButton } from 'react-paypal-button'
import CountryProvinceSelect from './CountryProvinceSelect'
import Squareform from './Sqaure'
import {Radio} from '@material-ui/core';
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import firebase from 'firebase'
import Expand from './Expand/Expand'
import Inputcontainer from './Inputcontainer'
import { useHistory } from 'react-router-dom'
import Summary from './Summary'
import Checkbox from '../../../Reuseable/Checkbox/Checkbox'
import { HashLink } from 'react-router-hash-link'
import Adresscard from '../../../Reuseable/Adresscard/Adresscard'

const Checkout = () => {
  const {
    incart, allproducts, 
    promotioncode, 
    setPromotioncode, 
    coupon, setCoupon, 
    percentoff, appliedcodes, 
    setLogotext, 
    country,setCountry, 
    setProvince, province, 
    setLocateuser, 
    rate, user, setOrderid, 
    setIncart, setUserorders,
    useradresses, defaultshipping, giftcards,
    allgiftcards, scrolled} = useContext(ContextApp)
  const [totalpricewithtax, setTotalpricewithtax] = useState(0)
 
  const [shippingoptions, setShoppingoptions] = useState([])

  const [selectedshipping, setSelectedshipping] = useState({type: shippingoptions[0]?.text, price: shippingoptions[0]?.value})


  const [totalpricewithcoupons, setTotalpricewithcoupons] = useState(totalPrice(incart, allproducts, appliedcodes, percentoff, selectedshipping.price))




 

  //form states
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [unit, setUnit] = useState('')
  const [zip, setZip] = useState('')
  const [extradetail, setExtradetail] = useState('')
  const [paymenttype, setPaymenttype] = useState('')
  const orderid = db.collection('users').doc().id
  const paypalOptions = {
    clientId: 'ASeiQwcEcB1m4j48PwRAge60TgY3zsrWgwEq1W7V8Oxp_SEeQmyUl5GlwOkbVTLXYzGSwZ7-yClszW8e',
    intent: 'capture',
    currency: 'CAD'
  }
  const [paytype, setPaytype] = useState('cc')
  const history = useHistory()
  const [saveshippinginfo, setSaveshippinginfo] = useState(false)
  const giftcardsamount = giftcards?.reduce((n, {amount}) => n + amount, 0)
  const [usedefault, setUsedefault] = useState(false)
  const [viewsummary, setViewsummary] = useState(false)
  const shippingoptionsrow = shippingoptions?.map(el=>{
    return (
      <label className={`${selectedshipping.price === el.value?'activeradio':''} shippingoption`}>
        <span>{el.text}</span>
        <Radio 
         size='small'
         color='default'
         style={{color: '#000'}}
         type="radio" 
         checked={selectedshipping.price === el.value} 
         value={selectedshipping.price} 
         onChange={(e)=> setSelectedshipping({price: el.value, type: el.text})}/>
      </label>
    )
  })

  const payments = [
    {
      text: 'Credit Card', 
      value: 'cc', 
      icon: 'fal fa-credit-card-front',
      component: <Squareform amount={totalpricewithtax} disabled={!(name && email  && city && street  && zip && selectedshipping)}/> 
    }, 
    {
      text: 'PayPal', 
      icon: 'fab fa-paypal', 
      value: 'pp', 
      component:  <PayPalButton
                  onPaymentSuccess={()=> console.log('asd')}
                  paypalOptions={paypalOptions}
                  onPaymentCancel={()=> {}}
                  onPaymentError={()=> window.alert('issue')}
                  amount={totalpricewithcoupons} 
                  options={{ clientId: 'AYJW3h5xitnLI5HAFLiPvkcRAGZf-DOyi8m5cJcFYm1is9UHBKMUVtTbDl_1xHhcCovZKlxNUVOBXjOH' }}
                  />
    }
    ]

    const paymentsrow = payments.map(payment=>{
      return (
        <div className="paymenttype">
             <Expand text={`Pay with ${payment.text}`} icon={payment.icon}>
               {payment.component}
             </Expand>
        </div>
      )
    })

    const useradressesrow = useradresses?.map(adress=>{
      return (
        <Adresscard adress={adress} checkout/>
      )
    })
  const successPayment = () => {
    const adressid = db.collection('orders').doc().id
    const shippinginfo = !usedefault?{
      name,
      lastname, 
      company, 
      email, 
      city,
      country,
      province,
      street,
      zip,
      unit,
      id: db.collection('orders').doc().id, 
      date: new Date(),
    }: useradresses.find(x=> x.id === defaultshipping) 
    if((name && email && country && province && city && street  && zip && selectedshipping)|| (usedefault && defaultshipping)){
    
      const updateOrders = (orderobject) => {
        setUserorders(prev=> [...prev, orderobject])
      }

 
        if(user) {
          if(saveshippinginfo) {
            db.collection('users').doc(user.uid).update({
              shippinginfo: firebase.firestore.FieldValue.arrayUnion(shippinginfo),
              cart: [],
              defaultadress: defaultshipping?defaultshipping:adressid
            });
          }
          else {
            db.collection('users').doc(user.uid).update({
              cart: [],
              defaultadress: defaultshipping?defaultshipping:adressid
            });
          }
          const reduceGiftCards = (copiedprice) => {
 
            for(let i = 0; i < giftcards.length; i++) {
              if (copiedprice >= giftcards[i].amount) {
                   copiedprice = copiedprice - giftcards[i].amount;
                   giftcards[i].amount = 0; // or remove it?
               }
               else{
                   giftcards[i].amount = giftcards[i].amount - copiedprice;
                   copiedprice = 0;
               }
            }
            giftcards.forEach(giftcard=> {
              allgiftcards.filter(x=> x.giftcardid !== giftcard.giftcardid).splice(0, -1).concat(giftcards).concat(allgiftcards.filter(x=> x.giftcardid === giftcard.giftcardid))
             })
           
        }
           reduceGiftCards(totalpricewithtax)
           db.collection('orders').doc('orders').update({
             giftcards: allgiftcards
           }) 
        }
        else {
          setIncart([])
        }
        const amountUsedInGift = totalpricewithtax>=giftcardsamount?giftcardsamount:giftcardsamount>totalpricewithtax?totalpricewithtax:0
        placeOrder(
          name, lastname, 
          company, email, 
          city, street, 
          zip, unit, 
          incart, extradetail, 
          paymenttype, appliedcodes, 
          user, selectedshipping, 
          allproducts, totalpricewithtax,
          orderid, percentoff, rate,
          shippinginfo, updateOrders,
          amountUsedInGift
          ) 
        setOrderid(orderid)
        history.push({
          pathname: '/website/ordercomplete',
          search: `?orderid=${orderid}`
        })
      }
      else {
        window.alert('Complete the form!')
      }

    }

  useEffect(()=>{
    setLocateuser(true)
    return ()=>{
      setLocateuser(false)
    }
  },[])

  useEffect(()=>{
    setShoppingoptions([{text: `Standard Shipping (${totalpricewithcoupons>50?"Free":'4.99'})`, value: totalpricewithcoupons>50?0:4.99}, {text: 'Exppress Shipping ($6.99)', value: 6.99}, {text: 'Next-Day Shipping (8.99)', value: 8.99}])
  },[totalpricewithcoupons])

  useEffect(()=>{
    setSelectedshipping({type: shippingoptions[0]?.text, price: shippingoptions[0]?.value})
  },[shippingoptions])
  
  useEffect(()=>{
    setTotalpricewithtax(totalPriceWithTax(incart, allproducts, appliedcodes, percentoff, rate)+selectedshipping?.price)
  },[ incart, appliedcodes, percentoff, allproducts, totalpricewithtax, rate, selectedshipping])
 
  useEffect(()=>{
    setLogotext('Checkout')
    return ()=>{
      setLogotext('')
    }
  },[])
  useEffect(()=>{

    if(viewsummary) {
     window.onclick=()=>{
       setViewsummary(false)
     }
    }

 },[viewsummary])

  return (
        <>{
       incart.length?
       <div className="checkout">
           
           <div className="checkoutside">
          <Checkoutcontainer notopen title='Default Shipping'>
          <Checkbox text='Use a selected adress?' checked={usedefault} setChecked={setUsedefault}/>
          <div className="adresses">
           {useradressesrow}
          </div>
          </Checkoutcontainer>
            {
              !usedefault &&
              <Checkoutcontainer notopen title='Custom Shipping Adress'>
              <Inputcontainer country={country} setCountry={setCountry}
                province={province} setProvince={setProvince}
                name={name} setName={setName}
                lastname={lastname} setLastname={setLastname}
                email={email} setEmail={setEmail} 
                company={company} setCompany={setCompany} 
                city={city} setCity={setCity}
                street={street} setStreet={setStreet}
                unit={unit} setUnit={setUnit}
                zip={zip} setZip={setZip}
               
              />
              {user &&<div className="forgot">
                <Checkbox text='Save Adress' checked={saveshippinginfo} setChecked={setSaveshippinginfo} />
              </div>}
            </Checkoutcontainer>
            }
          <Checkoutcontainer title='Shipping Method'>
            <div className="shippingmethods">
            {shippingoptionsrow}
            </div>
          </Checkoutcontainer>
          <Checkoutcontainer title='Coupons and Promotions'>
            <div className="couponsection detailscontainer">      
                <div>
                  <Couponcontainer expand={true}/>
                </div>   
            </div>
          </Checkoutcontainer>   
          <Checkoutcontainer title='Extra Details'>
            <div className="couponsection detailscontainer">      
                <div className="extradetail">
                  <span>Order Notes</span>
                  <Textarea placeholder='Notes/Other Details' value={extradetail} setValue={setExtradetail}/>
                </div>
            </div>
      
          </Checkoutcontainer>
              <div className="paypal">
                {paymentsrow}
                {/* <StripeFormCheckout totalpricewithtax={totalpricewithtax.toFixed(2)}/> */}
            
                <Appbtn text='Create Order' clickEvent={()=> successPayment()}/>

              </div>
            </div>
          <Summary
            className={viewsummary?'active':''} 
            incart={incart} allproducts={allproducts}
            appliedcodes={appliedcodes} percentoff={percentoff}
            giftcardsamount={giftcardsamount} 
            selectedshipping={selectedshipping} rate={rate}
            title='Price Summary'
            title2='Your Cart' 
            />
      <div onClick={(e)=> {setViewsummary(!viewsummary); e.stopPropagation()}} className={scrolled?"viewsummarystrip viewsummarystripactive":'viewsummarystrip'}>
        <i className={`fal fa-chevron-${viewsummary?'right':'left'}`}></i>
        <span>{viewsummary?'Hide Summary':"View Summary"}</span>
      </div>
   
    </div>
    :
    <div className="emptycart">
        <h3>Your Shopping Cart is Empty!</h3>
        <HashLink to='/website/shop'>
          <Appbtn text='Continue Shoppping' />
        </HashLink>
    </div>    
      }
      </>
  )
}
export default Checkout