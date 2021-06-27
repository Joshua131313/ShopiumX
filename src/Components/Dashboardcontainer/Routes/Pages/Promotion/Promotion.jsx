import React, {useState, useEffect, useContext} from 'react'
import { ContextApp } from '../../../../../ContextAPI'
import { db } from '../../../../../Fire'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Appinput from '../../../../Reuseable/Appinput/Appinput'
import './Promotion.css'
import Promotions from './Promotions'

const Promotion = (props) => {
  const {promotions, addNoti} = useContext(ContextApp)
  const [promos, setPromos] = useState(promotions)
  const handleUpdatePromos = () => {
    db.collection('dashboard').doc('dashboard').update({
      'settings.promotions': promos.filter(x=> x.promotion && x.percent)
    })
    .then(()=> {
      addNoti('Promotions successfully updated!', 'fal fa-check-circle')
    })
    .catch(()=> {
      addNoti('Try again later!', 'fal fa-exclamation-circle')
    })
  }
  return (
    <div className="dashboardsales templatecont">
      <h3>Promotions</h3>
      <div className="promotions">
        <div className="innerpromotions">
          <Promotions promotions={promos} setPromotions={setPromos} />
        </div>
        <Appbtn clickEvent={()=> handleUpdatePromos()} className='promotionupdatebtn' text='Update Promotions'/>
      </div>
    </div>
  )
}
export default Promotion