import React, { useContext, useEffect, useRef, useState } from 'react'
import Modal from '../../../Reuseable/Modal/Modal'
import './Trackingordermodal.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { orderstatus } from '../../../../Appconstants';
import Loader from '../../../Reuseable/Loader/Loader';
import Copy from './Copy';
import { ContextApp } from '../../../../ContextAPI';
import { convertDateToString } from '../../../../Appfunctions';

const Trackordermodal = (props) => {
  const {user} = useContext(ContextApp)
  const {order, modal, setModal} = props 
  const statusBar = orderstatus.filter(x=> order?.updates?.some(el=> x.status === el.status ))
  const [status, setStatus] = useState(statusBar)

  const root = order?.trackingid?.delivery

  const delivery = root?root?.toDate?.().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric', weekday: 'long'}):'To Be Determined' 
  const iconsrow = orderstatus.map(el=>{
    return (
      <i className={el.icon} style={el.percent<=status?.percent?{display:'flex'}:{display: 'none'}}></i>
    )
  })
  const trackingupdatesrow = order?.updates?.map(update=>{
    return (
      <div className="orderupdate">
          <div className="statusicon">
            <span className="innerdot"></span>
          </div>
          <div className='orderupdateinfo'>
            <strong>{update.status}</strong>
            <span className='sb'>
                <span>
                {update?.details}
                </span>
                <span>
                {convertDateToString(update?.date.toDate?.())}
                </span>
            </span>
          </div>
      </div>
    )
  })
  useEffect(()=>{
      setStatus(statusBar[statusBar.length - 1])
    },[statusBar])
  return (
    <Modal className='trackordermodal' modal={modal} setModal={setModal}>
      <div className="trackingcontain">
          <div className='title bordercont'>
            <div>
            <h3>Tracking Details</h3>
            <span>
              <span className='carrier'>
                {
                order.trackingid?.carrier?
                'Carrier: '+order.trackingid?.carrier:'Order Received'
                }
              </span> 
             {
               order.trackingid?.carrier&&
               <span className='trackingnumber'>
                <span>Tracking Number:</span>
                <Copy text={order?.trackingid?.id}/>
              </span>
            }
            {
              order.userid === user?.uid&&
              <span className='trackingnumber'>
                <span>Delivery Adress: </span>
                <span>{order.shippinginfo?.street}</span>
              </span>
            }
            </span>
            </div>
          </div>
          <div className="trackingbar bordercont">
            <div>
              <h3>{status?.status}</h3>  
              <small className="graytext">{status?.status==='Delivered'?convertDateToString(order?.updates.find(x=> x.status ==='Delivered')?.date?.toDate()):'Est. Delivery Date: '+delivery}</small>    
            </div> 
            <div className="progressbar">
              <div className="percent" style={{width: status?.percent+'%'}}>
                  {iconsrow}
              </div>
            </div>
          </div>
          <div  className="trackingupdates bordercont">
               {/* <div className="progressline" ></div> */}
               {trackingupdatesrow}
          </div>
          <div className="copyid">
           <span style={{marginRight: '2px'}}>Order ID: </span> <Copy text={order?.orderid}/>
          </div>
        </div>
        <i className='fal fa-times closeicon' onClick={()=> setModal(false)}></i>
    </Modal>
  )
}
export default Trackordermodal