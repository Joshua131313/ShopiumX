import React from 'react'
import Chart from '../Chart/Chart'
import './Detailcard.css'

const Detailcard = (props) => {
  const {
    text, amount, 
    money, icon, 
    charttype, color, 
    chartdata, curve, bg} = props.detailcard

  return (

    <div className="detailcard" style={{background: bg}}>
      <div className="ddcc">
        <div>
          <h4>{text}</h4>
          <strong>
          {money&&<i className='fal fa-dollar-sign'></i>}
          {amount}
          </strong>
        </div>
        <div className="iconddcc">
         <i className={icon} style={{color: bg}}></i>
        </div>
      </div>
      <div className="chartcont">
          <Chart       
            // data={[2, 69, 54, 50, 33, 12]}
            enabled={false}
            charttype={charttype} 
            curve={curve} 
            color={color}
            show={false}
            />
      </div>
    </div>
  )
}
export default Detailcard