import React, { useContext, useEffect, useRef, useState } from 'react'
import { ContextApp } from '../../../../ContextAPI'
import Logininput from '../../../Login/Logininput/Logininput'
import Appbtn from '../../../Reuseable/Appbtn/Appbtn'
import Checkbox from '../../../Reuseable/Checkbox/Checkbox'
import Summary from '../Checkout/Summary'
import './Ordercomplete.css'
import { CSSTransition } from 'react-transition-group';
import Login from '../../../Login/Login'
import Modal from '../../../Reuseable/Modal/Modal'
import firebase from 'firebase'
import { db } from '../../../../Fire'
import { writeUserdocuments } from '../../../../Appfunctions'
import Createpdf from '../../../Reuseable/Createpdf/Createpdf'
import Invoice from '../../../Reuseable/Createpdf/Invoice'
import { useLocation } from 'react-router-dom'

const Ordercomplete = (props) => {
  const {orderid} = props
  const {orders, user, incart, saved, savedforlater, compared,} = useContext(ContextApp)
  const [recentorder, setRecentorder] = useState(orders.find(x=> x.orderid === 'SqtzwyjvEgMYLrGJp1xO'))
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [showpassword, setShowpassword] = useState(false)
  const [email, setEmail] = useState(recentorder?.shippinginfo.email)
  const [modal, setModal] = useState(false)
  const [errors, setErrors] = useState({
    password: '',
    email: ''
  })
   
 const location  = useLocation()
  const register = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      setModal(false)
    })
    .catch(err => {
      switch(err.code) {
        case "auth/email-already-in-use":
            setErrors({email: err.message})
            break
            case "auth/invalid-email":
                setErrors({email: err.message})
            break
            case "auth/weak-password":
              setErrors({password: err.message})
            break
            default: 
      } 
      setTimeout(()=>{
        setErrors({
          password: '',
          email: ''
        })
      },4000) 
    })
    firebase.auth().onAuthStateChanged(user=>{
      if(user) {
        writeUserdocuments(user, email, recentorder?.shippinginfo.name)
      }
    })

  }
  useEffect(()=>{
    setRecentorder(orders.find(x=> x.orderid === orderid))
  }, [orderid, orders, location])
  return (
    <div  className="ordercomplete checkout">
      <div className="leftcomplete checkoutside">
        <div className="ordercompletedsummary">
        <h3>Thank You For Your Order</h3>
        <small>
          <span className='graytext'>A confirmation email will be sent to:</span>
          <strong >{email}</strong>
          <span>Order ID: <strong>{orderid}</strong></span>
        </small>
        <Createpdf order={recentorder}>
        {({invoiceref})=>(
        <Invoice order={recentorder} invoiceref={invoiceref} />
        )}
        </Createpdf>
      </div>
      {!user&&
           <div className="createaccountwindow">
           <h3>Create an account</h3>
           <ul>
             <li>Manage your payments</li>
             <li>View advanced order status</li>
             <li>Create and use default shipping adress</li>
           </ul>
           <div className="createpassword">
           <div>
             <Appbtn text='Create Account' clickEvent={()=> setModal(true)}/>
           </div>
         </div>
         </div>
        }
   
      </div>
    <Summary 
      appliedcodes={recentorder?.couponsused}
      percentoff={recentorder?.percentoff}
      selectedshipping={recentorder?.selectedshipping}
      rate={recentorder?.rate}
      incart={recentorder?.orderinfo.products}
      title='Price Overview'
      title2='Purchased Items'
      giftcardsamount={recentorder?.giftcardsamount} 
    />

    <Modal className='accountmodal' modal={modal} setModal={setModal}>
            <div className="createtitle">
              <h2>
                <span>Create Account</span>
                <small className="graytext">Join ShopiumX</small>
              </h2>
              <div className="inputs">
                <Logininput 
                placeholder={'Email'}
                value={email}
                setValue={setEmail} 
                icon='fal fa-envelope'/>
                <small style={{color: 'var(--red)'}}>{errors.email}</small>
                <Logininput 
                clickEvent={()=> setShowpassword(!showpassword)}
                value={password}
                type={showpassword?'text':'password'} 
                setValue={setPassword} 
                showpassword={showpassword}
                icon='fal fa-lock' eye
                placeholder='Password'
                />
                <small style={{color: 'var(--red)'}}>{errors.password}</small>

                <div onClick={()=> register()}>
                <Appbtn text='Register' />
                </div>
              </div>
            </div>
            <i className='fal fa-times closeicon' onClick={()=> setModal(false)}></i>
    </Modal>
    </div>
  )
}
export default Ordercomplete