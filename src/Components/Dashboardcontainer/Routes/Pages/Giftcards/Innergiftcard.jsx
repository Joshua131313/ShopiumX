import React, {useState, useEffect} from 'react'
import ReactTimeAgo from 'react-time-ago'
import { db } from '../../../../../Fire'
import ImgLoaded from '../../../../Reuseable/ImgLoaded'

const Innergiftcard = (props) => {

  const {card, sort} = props
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(()=> {
      if(sort !== 'date') {
        db.collection('users').doc(sort==='fromuserid'?card.touserid:card.fromuserid).onSnapshot(snap=> {
          const data = snap.data()
            if(data) {
              setImg(data.userinfo.cover)
              setName(data.userinfo.name)
            }
    
        })
      }
      else {
        db.collection('users').doc(card.fromuserid).onSnapshot(snap=> {
          const data = snap.data()
          if(data) {
            setImg(data.userinfo.cover)
            setName(data.userinfo.name)
          }
        })
      }
    
  }, [sort, card])

  return (
    <div className="giftcarditem quickorderview">
    <div className="leftview">
      <ImgLoaded img={img} skeletonclass='imgleftskeleton'/>
      <h3 >
        <span>{name}</span>
        <span className="amountorder">${card.paid.toFixed(2)}</span>
      </h3>
    </div>
    <div className="rightview">
    {(typeof card.date?.toDate !== 'function')?'':<ReactTimeAgo date={card.date.toDate()}/>}
    </div> 
  </div>
  )
}
export default Innergiftcard