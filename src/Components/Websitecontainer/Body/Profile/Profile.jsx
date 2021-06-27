import React, { useContext, useEffect, useState } from 'react'
import Linkstab from './ProfileElements/Linkstab'
import Routestab from './ProfileElements/Routestab'
import './Profile.css'
import { ContextApp } from '../../../../ContextAPI'
const Profile = () => {
  const links = [
    {
      link: '',
      text: 'Overview',
      icon: 'fal fa-home',
      component: 'Details'
    },

    {
      link: '/adress',
      text: 'My Adresses',
      icon: 'fal fa-map-marker-alt',
      component: "Adress"
    },
    {
      link: '/orders',
      text: 'My Orders',
      icon: 'fal fa-shopping-bag',
      component: 'Orders'
    },
    {
      link: '/payments',
      text: 'My Payments',
      icon: 'fal fa-credit-card-front',
      component: "Payment"
    },
    {
      link: '/reviews',
      text: 'My Reviews',
      icon: 'fal fa-star',
      component: "Ratings"
    },
    {
      link: '/profile',
      text: 'Profile',
      icon: 'fal fa-user',
      component: 'Settings'
    }
  ]


  return (
    <div className="profile">
        <Linkstab links={links}/>
        <Routestab links={links}  />
    </div>
  )
}
export default Profile