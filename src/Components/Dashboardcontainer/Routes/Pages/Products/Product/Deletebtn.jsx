import React, { useContext } from 'react'
import { ContextApp } from '../../../../../../ContextAPI'
import { db } from '../../../../../../Fire'
import { addNotification } from '../../../../../Reuseable/Addnotification/Addnotification'
import Appbtn from '../../../../../Reuseable/Appbtn/Appbtn'

const Deletebtn = (props) => {
  const {id, name} = props
  const {allproducts, notifisystem} = useContext(ContextApp)
  
  const handleDelete = () => {
    const bool = window.confirm(`Are you sure you would like to delete ${name}?`)
    if(bool) {
      allproducts.forEach(product=> {
        if(product.id === id) {
          const index = allproducts.indexOf(product)
          allproducts.splice(index, 1)
          db.collection('products').doc('products').update({
            products: allproducts
          })
          .then(()=> {
            addNotification({
              msg: 'Product was successfully deleted!',
              icon: 'fal fa-check-circle',
              notifisystem
            })
          })
          .catch(()=> {
            addNotification({
              msg: 'Try again later...',
              icon: 'fal fa-exclamation-circle',
              notifisystem
            })
          })
        }
      })
    }
  }

  return (
    <Appbtn 
      clickEvent={()=> handleDelete()}
      text='Delete' 
      className='reverse' 
      icon='fal fa-trash'/>
  )
}
export default Deletebtn