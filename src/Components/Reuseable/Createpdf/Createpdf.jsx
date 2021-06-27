import React, { useRef } from 'react'
import Appbtn from '../Appbtn/Appbtn'
import ReactToPdf from 'react-to-pdf'
import './Createpdf.css'
const Createpdf = (props) => {
  const {text='Download Invoice', order} = props
  const invoiceref = useRef()

  return (
    <div className="createpdf">
      {props.children({
        invoiceref
      })} 
     <ReactToPdf filename={order?.orderid} targetRef={invoiceref}>
       {({toPdf}) =>  (
          <Appbtn text={text} clickEvent={toPdf}/>
        )}
      </ReactToPdf>
    </div>
  )
}
export default Createpdf