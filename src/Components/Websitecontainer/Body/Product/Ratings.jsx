import React from 'react'
import {Rating} from '@material-ui/lab'
 
const Ratings = (props) => {
  const {rating, readonly, userid, userratings, setRating, precision=0.5, disabled} = props

  const updateProductRating = (rating) => {}

  return (
    <div className="ratings">
      <Rating size='small' name='simple-controlled'
      onChange={(e, newValue)=> {
        setRating && setRating(newValue?newValue:0);
      }} 
      disabled={disabled}
      precision={precision}
      value={rating}
      readOnly={readonly}
      />
    </div>
  )
}
export default Ratings