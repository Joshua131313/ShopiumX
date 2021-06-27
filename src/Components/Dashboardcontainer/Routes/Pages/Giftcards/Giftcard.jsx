import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { giftcardtemplates } from '../../../../../Appconstants'
import { db } from '../../../../../Fire'
import AccordionTab from '../../../../Reuseable/Accordion/Accordion'
import Template from '../../../../Websitecontainer/Body/Profile/ProfileElements/Wallet/Template/Template'
import ReactTimeAgo from 'react-time-ago'
import { ContextApp } from '../../../../../ContextAPI'
import Innergiftcard from './Innergiftcard'
import ImgLoaded from '../../../../Reuseable/ImgLoaded'
import { convertDateToString } from '../../../../../Appfunctions'
const Giftcard = (props) => {
  const {allusers} = useContext(ContextApp)
  const {id, cards, sort} = props
  const [name, setName] = useState('')
  const [cover, setCover] = useState('')
  const [boughtby, setBoughtby] = useState('') 
  const [isLoaded, setIsLoaded] = useState(false)
  const [showimg, setShowimg] = useState(true)
 
  useEffect(()=> {
    if(id) {
      
    if(sort !=='date') {
      setShowimg(true)
      db.collection('users').doc(id).onSnapshot(snap=> {
        const data = snap.data()
        if(data) {
         setCover(data.userinfo.cover)
         setName(data.userinfo.name)
        }
      })
    }
    else {
      setName(id)
      setShowimg(false)
    }
    }
  }, [id, sort])

  return (
    <div className='giftcardinvoice'>
    <AccordionTab 
      title={
        <Link className='giftcardbuyer'>
         {showimg && <ImgLoaded img={cover} skeletonclass='imgleftskeleton'/>}
          <span >
           {name}
          </span>
        </Link>
      }
      >
        <div className="buyergiftcards">
        {
          props.children
        }
        </div>
      </AccordionTab>

   </div>
  )
}
export default Giftcard