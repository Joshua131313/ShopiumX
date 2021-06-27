import React from 'react'

const Timerbox = (props) => {
  const {time, text} = props
  return (
    <div className="timerbox">
      <strong>
      {time}
      </strong>
      <small className="graytext">
        {text}
      </small>
    </div>
  )
}
export default Timerbox