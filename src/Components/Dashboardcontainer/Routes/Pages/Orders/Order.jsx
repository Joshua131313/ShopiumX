import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../../../Fire'
import AccordionTab from '../../../../Reuseable/Accordion/Accordion'
import ImgLoaded from '../../../../Reuseable/ImgLoaded'
import Ordercard from '../../../../Reuseable/Ordercard/Ordercard'

const Order = (props) => {
  const {orders, sort, id} = props
  const [name, setName] = useState('')
  const [showimg, setShowimg] = useState(false)
  const [cover, setCover] = useState('')

  useEffect(()=> {
    if(id) {
    if(sort ==='userid') {
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
    <div className='orderdata'>
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
          orders.map(order=> {
           return  <Ordercard dashboard order={order} status={sort==='userid'?'ordered':sort}/>
          })
        }
        </div>
      </AccordionTab>

   </div>
  )
}
export default Order