import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import './Modal.css'
const Modal = (props) => {
  const {className, modal, setModal} = props

  useEffect(()=> {
    if(modal) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'initial'
    }
  }, [modal])
  return (
      <CSSTransition 
      timeout={300}
      in={modal}
      unmountOnExit
      classNames={`${className} modal`}
      >
      <>
      <div className="modal">
       {props.children}
      </div>
      </>
      </CSSTransition>
  )

}
export default Modal
