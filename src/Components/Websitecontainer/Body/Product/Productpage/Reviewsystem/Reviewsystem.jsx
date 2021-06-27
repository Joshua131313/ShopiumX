import React, { useContext, useState } from 'react'
import { ContextApp } from '../../../../../../ContextAPI';
import { db } from '../../../../../../Fire';
import Appbtn from '../../../../../Reuseable/Appbtn/Appbtn';
import Textarea from '../../../../../Reuseable/Textarea/Textarea';
import Ratings from '../../Ratings';
import Review from './Review';
import './Reviewsystem.css'
import Filter from 'bad-words'
import { addNotification } from '../../../../../Reuseable/Addnotification/Addnotification';

const Reviewsystem = (props) => {
  const {product} = props
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const {allproducts, user, notifisystem, userorders} = useContext(ContextApp)
  const filter = new Filter()
  const reviewrow = product?.reviews?.map(review=>{
    return (
      <Review review={review}  reviews={product?.reviews}/>
    )
  })
  const userBoughtItem = userorders.some(x=> x.orderinfo.products.some(el=> el.id === product.id))
  
  const postReview = () => {
    if(user){
 
        if(!filter.isProfane(message)) {
          if(message !== '') {
            allproducts && allproducts.map(productcopy=> {
              if(productcopy.id === product.id) {
                const index = allproducts.indexOf(productcopy)
      
                allproducts[index].reviews.push({
                  message,
                  postedby: user?user.uid:'Geust',
                  rating,
                  id: db.collection('users').doc().id,
                  date: new Date()
                })
                db.collection('products').doc('products').update({
                  products: allproducts
                })
              }
            })
            setMessage('')
            setRating(0)    
          }
        }
        else {
          addNotification({
            notifisystem,
            msg: 'No bad words!',
            icon: 'fal fa-exclamation-circle'
          })
        }
    }
    else {
      window.alert('Geust Cannot Post Reviews!')
    }
  }
  
  return  ( 
    <div className="reviewsystem">
      <h2>Reviews</h2>
      <div className="reviewcontrols">
        <div>
          <h4>
            <span>Review {product.name}</span>
            {!userBoughtItem&&<span className='warning'>
              You must buy this item to post a review!
            </span>}
          </h4>
        </div>
       <div className="ratinginputs">
      <Ratings disabled={!userBoughtItem} rating={rating} setRating={setRating} precision={0.5}/>
        <Textarea 
        disabled={!userBoughtItem}
        placeholder={'Your Review'}
        value={message} setValue={setMessage}/>
        <Appbtn disabled={(message === '' || !userBoughtItem)} text='Post Review' clickEvent={()=> userBoughtItem?postReview():window.alert('You must buy this item to leave a review!')}/>
       </div>
      </div>
      <div className="reviews">
          {reviewrow.length !== 0&&reviewrow}
      </div>

    </div>
  )
}
export default Reviewsystem 