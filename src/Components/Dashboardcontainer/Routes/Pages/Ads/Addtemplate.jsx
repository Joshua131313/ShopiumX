import React, { useContext } from 'react'
import { ContextApp } from '../../../../../ContextAPI'
import { db } from '../../../../../Fire'

const Addtemplate = (props) => {
  const {template} = useContext(ContextApp)
  const {templatec} = props

  const handleSetAdd = () => {
    db.collection('dashboard').doc('dashboard').update({
      'settings.template' : {
        id: templatec.id,
        key: templatec.key
      }
    })
  }

  return (
    <div onClick={()=> handleSetAdd()} className={`addtemplate ${templatec.class} ${templatec.id === template?.id?'activetemplate':''}`}>
        <div className='addcontentimg'>
          <h2></h2>
          <img src="https://i.imgur.com/ZKwHw3N.png" alt=""/>
        </div>
        <div className="addcontent">
          <h2></h2>
          <h2></h2>
          <h2></h2>
        </div>
        <small className="templatename">
          {templatec.class}
        </small>
    </div>
  )
}
export default Addtemplate