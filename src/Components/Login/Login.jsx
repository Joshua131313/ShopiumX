import React, { useContext, useState } from 'react'
import Logo from '../Reuseable/Logo/Logo'
import firebase from 'firebase'
import './Login.css'
import Logininput from './Logininput/Logininput'
import Loginbtn from './Logininput/Loginbtn'
import Statecontainer from './Statecontainer'
import Appbtn from '../Reuseable/Appbtn/Appbtn'
import { ContextApp } from '../../ContextAPI'
import { addNotification } from '../Reuseable/Addnotification/Addnotification'
import Checkbox from '../Reuseable/Checkbox/Checkbox'
import { Redirect } from 'react-router-dom'
const Login = (props) => {
  const {
    name, email,
    password, setName,
    setEmail, confirm,
    setConfirm,
    passworderror, emailerror,
    setPassword, 
    handleSignup, 
    handleLogin,
    loginwithProvider,
    loading, refe
  } = props
  
  const {notifisystem, user} = useContext(ContextApp)
  const [hasaccount, setHasaccount] = useState(false)
  const [forgotpassword, setForgotpassword] = useState(false)
  const [showpassword, setShowpassword] = useState(false)
  const [keepsignedin, setKeepsignedin] = useState(false)

  function sendResetEmail(){
    if(email !=='') {
      firebase.auth().sendPasswordResetEmail(email)
      .then(()=>{
        const parameters = {
          notifisystem, 
          msg: 'Email Sent!',
          icon: 'fad fa-envelope'
        }
        addNotification(parameters)
      })
      .catch(()=>{
        addNotification({
          notifisystem,
          msg: 'Try Again!',
          icon: 'fal fa-exclamation-circle'
        })
      })
    }
  }
  return (
    <div className="logincontainer">
      <div className="loginbanner">
        <Logo />
        <img src="https://i.imgur.com/NSFmlLr.jpg" className='loginimg' alt=""/>
      </div>
      <div className="logincont">
          <div className="logintitle">
          <h2>Welcome to ShopiumX</h2>
          <span >
            {forgotpassword?'Reset Password':hasaccount?'Sign in your account':'Create an account'}
          </span>
          </div>
          <form onSubmit={e=> e.preventDefault()}>
              {!forgotpassword&&
                  <>
                  {
                    (!hasaccount)&& 
                    <Logininput value={name}  icon='fal fa-user' placeholder='Full Name' setValue={setName}/>
                  }
                  </>
              }
              <Logininput value={email}  icon='fal fa-envelope' placeholder='Email Adress' setValue={setEmail} />
             {
               !forgotpassword &&
             <>
             {
                (hasaccount||!hasaccount) && 
                <>
                <Logininput value={password} type={!showpassword&&'password'} icon='fal fa-lock' placeholder='Password' setValue={setPassword} eye={true} showpassword={showpassword} clickEvent={()=>setShowpassword(!showpassword)}/>
                {!hasaccount&&<Logininput value={confirm}  type={!showpassword&&'password'} icon='fal fa-lock' placeholder='Confirm Password' setValue={setConfirm} />}
                 <div className="forgot">
                   <Checkbox checked={keepsignedin} setChecked={setKeepsignedin}
                     text='Remember me'
                   />
                   <span className='forgottext' style={{cursor: 'pointer'}} onClick={()=>setForgotpassword(true)}>
                     Forgot?
                   </span>
                 </div>
                </>
             }
             </>
             }
              {
                forgotpassword?
                <Statecontainer text='Back to login' btntext='Send Email' clickEvent={()=>sendResetEmail()} setState={()=>setForgotpassword(false)}/>
                :
                !hasaccount?
                <Statecontainer text='Login' text2='Already have an account?' btntext='Register'  clickEvent={()=>handleSignup(email, password, name, confirm)} setState={()=>setHasaccount(!hasaccount)}/>
                :
                <>
                <Statecontainer text='Create Account' text2="Don't have an account?" btntext='Login' clickEvent={()=>handleLogin()} setState={()=>setHasaccount(!hasaccount)}/>
                </>
              }
              {
                !forgotpassword && 
                <>
                <button className='googlebtn diflogin' onClick={()=>loginwithProvider(new firebase.auth.GoogleAuthProvider())}>
                  <i className='fab fa-google'></i>
                  <span>Login with Google</span>
                </button>
                <button className='facebookbtn diflogin' onClick={()=>loginwithProvider(new firebase.auth.FacebookAuthProvider())}>
                  <i className="fab fa-facebook"></i>
                  <span>Login with Facebook</span>
                </button>
                </>
              }
          </form>
      </div>
      {user&& <Redirect to='/website'/>}
    </div>
  )

}
export default Login