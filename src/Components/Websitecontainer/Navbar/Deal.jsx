import React, { useContext, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ContextApp } from '../../../ContextAPI';
import { addNotification } from '../../Reuseable/Addnotification/Addnotification';

const Deal = (props) => {
  const {setShowdeal, couponcode} = props
  const [copied, setCopied] = useState(false)
  const { notifisystem} = useContext(ContextApp)

  return (
  <div className="deal">
    <p>
    <span>
    {' '}
    Earn up to
    {' '}
    </span>
    <strong>{couponcode.percent}% off</strong> 
    <span> 
    {' '}
    your next order with promotion code:
    {' '}
    </span>
    <strong style={{textDecoration: 'underline', cursor: 'pointer'}}>
    <CopyToClipboard text={couponcode.promotion}
    onCopy={() => {addNotification({
      notifisystem,
      msg: 'Copied to clipboard!',
      icon: 'fad fa-copy'
    })}}>
        <span >{couponcode.promotion}</span>
    </CopyToClipboard>
    </strong>
    </p>
    <i className='fal fa-times' onClick={()=> setShowdeal(false)}></i>
  </div>
  )
}
export default Deal