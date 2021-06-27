import React, {useEffect, useState} from 'react'
import "./styles.css";
import AOS from 'aos'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from './Components/Login/Login';
import firebase from 'firebase'
import { db } from './Fire';
import ContextAppProvider from './ContextAPI';
import { AnimatePresence } from 'framer-motion'
import Dashboardcontainer from './Components/Dashboardcontainer/Dashboardcontainer';
import Websitecontainer from './Components/Websitecontainer/Websitecontainer';
import Notifisystem from './Components/Reuseable/Addnotification/Notifisystem';
import { writeUserdocuments } from './Appfunctions';
import ScrollToTop from './Components/Reuseable/ScrollToTop/ScrollToTop';

export default function App() {
  const [user, setUser] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [passworderror, setPassworderror] = useState('')
  const [emailerror, setEmailerror] = useState('')
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(true)
  const clearInputs = () =>{
    setName('')
    setEmail('')
    setPassword('')
    setConfirm('')
  }
  const clearErrors = () =>{
    setEmailerror('')
    setPassworderror('')
  }
 
  const handleLogin = () =>{
      clearErrors()
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{
        setLoading(true)
      })
      .catch(err => {
        switch(err.code) {
          case "auth/invalid-email":
            setEmailerror(err.message)

          break
          case "auth/user/disabled":
          case "auth/user-not-found":
            setEmailerror('Email does not exist')
          break
          case "auth/wrong-password":
            setPassworderror('Incorrect Password')
          break
          default: 
        } 
        setTimeout(()=>{
         clearErrors()
        },4000) 
      })

  }
  const handleSignup = () =>{
   
  if((password === confirm) && name !=='') {
      clearErrors()
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=>{
        setLoading(true)
      })
      .catch((err)=>{
        switch(err.code) {
          case "auth/email-already-in-use":
          setEmailerror(err.message)
            break
          case "auth/invalid-email":
          setEmailerror(err.message)
          break
          case "auth/weak-password":
            setPassworderror(err.message)
          break
          default: 
          setEmailerror(err.message)
          setTimeout(()=>{
            clearErrors()
          }, 4000)
        }
      })

      firebase.auth().onAuthStateChanged(user => {
        if(user) {
            user.updateProfile({
              displayName: name
            })
            writeUserdocuments(user, email, name, '')
          }
          else {
            setUser('')
        }
      })
   }
  }
  
  const loginwithProvider = (provider) => {
    provider.addScope('email');
    firebase.auth()
    .signInWithPopup(provider)
    .then((result)=>{
      if(result.additionalUserInfo.isNewUser) {
        const user = result.user  
        writeUserdocuments(user, user.email, user.displayName, user.photoURL)
      }
    })
  }

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user=>{
      if(user) {
        clearInputs()
        setUser(user)
      }
      else {
        setUser('')
      }
    })
  }

  useEffect(()=>{
    AOS.init();
    authListener() 
  },[])

  useEffect(()=>{
    setLoaded(false)
  },[])

  return (
   <Router>
     <ScrollToTop />
      <AnimatePresence>
        <ContextAppProvider >
          <Notifisystem />
          <Switch>
         
          <Route exact path='/'>
            <Redirect  to='/website'/>
          </Route>
    
            <Route path='/dashboard'>
              <Dashboardcontainer />
            </Route>
          
          <Route path='/website'>
            <Websitecontainer 
            />
          </Route>
          <Route path='/login'>
            <Login
              loading={loading} 
              handleLogin={handleLogin}
              name={name} setName={setName}
              email={email}  setEmail={setEmail}
              password={password} setPassword={setPassword} 
              confirm={confirm} setConfirm={setConfirm}
              passworderror={passworderror} emailerror={emailerror}
              loginwithProvider={loginwithProvider}
              handleSignup={handleSignup}
            />
          </Route>
          
          </Switch>
        </ContextAppProvider>
      </AnimatePresence>
   </Router>
  );
}
