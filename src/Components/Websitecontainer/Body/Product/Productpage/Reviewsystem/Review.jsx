import {Rating} from '@material-ui/lab'
import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../../../../ContextAPI'
import { db } from '../../../../../../Fire'
import Textarea from '../../../../../Reuseable/Textarea/Textarea'
import './Review.css'
import ReactTimeAgo from 'react-time-ago'

const Review = (props) => {
  const {user, allproducts} = useContext(ContextApp)
  const {review, reviews} = props
  const [userratingimg, setUserratingimg] = useState('')
  const [value, setValue] = useState(review?.message)
  const [rating, setRating] = useState(review?.rating)
  const [edit, setEdit] = useState(false)
 
  const updateProducts = () => {
    db.collection('products').doc('products').update({
      products: allproducts
    })
    .then(()=>{
     setEdit(false)

    })
  }
  const saveReview = () => {
      if(value !=='') {
        reviews && reviews.map(reviewc=> {
          if(reviewc.id === review.id) {
            const reviewindex = reviews.indexOf(reviewc)
            reviews[reviewindex].rating = rating
            reviews[reviewindex].message = value
            updateProducts()
          }
        })    
      }
  }
 
  const deleteReview = () => {
    
    reviews && reviews.map(reviewc=> {
      if(reviewc.id === review.id) {
        const reviewindex = reviews.indexOf(reviewc)
        reviews.splice(reviewindex, 1)
        updateProducts()
      }
    })

  }

  useEffect(()=>{
    if(review?.postedby === 'Geust') {
      setUserratingimg('https://i.imgur.com/xsV2sbE.png')
    } 
    else { 
      db.collection('users').doc(review.postedby).onSnapshot(snap=>{
        setUserratingimg(snap.data().userinfo.cover)
      }) 
    }
    setRating(review?.rating)
    setValue(review?.message)
  },[review])
 
  return (
  <div className={`review ${edit?'editreview':''} ${(user.uid === review.postedby && !edit)?'userreview':''}`}>
    <div className="reviewleft">
      <img src={userratingimg} alt=""/>
        <div>
        <Textarea value={value} setValue={setValue} disabled={!edit}/>
    
          <div className='save'> 
            {edit?
            <>
            <small className="graytext" onClick={()=> saveReview()}>Save</small>
            <small className="graytext" onClick={()=> deleteReview()}>Delete</small>
            </>
            :user.uid === review.postedby&&
            <small className="graytext" onClick={()=> setEdit(true)}>Edit</small>  
          }
          <small className='graytext'>
          {(typeof review.date.toDate !== 'function')?'':<ReactTimeAgo date={review.date.toDate()}/>}
          </small> 
          </div>
        </div>  
    </div>
    <div className="reviewright">
    <Rating value={rating}       onChange={(e, newValue)=> {
        setRating && setRating(newValue?newValue:0);
      }} 
      readOnly={!edit} size='small' precision={0.5}/>

    </div>

  </div> 
  )
}
export default Review
