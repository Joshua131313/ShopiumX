import React, {useState, useEffect, useContext} from 'react'
import Switch from '../../../../Reuseable/Switch/Switch'
import './Ads.css'
import firebase from 'firebase'
import { db } from '../../../../../Fire'
import { ContextApp } from '../../../../../ContextAPI'
import Addtemplate from './Addtemplate'

const Ads = (props) => {
  const {googleads, promotions} = useContext(ContextApp)
  const updateAdds = () => {
  
    db.collection('dashboard').doc('dashboard').update({
      'settings.googleads':  !googleads
    })

  }
  const templates = [
    {class: 'Image Above', key: '-6t+ed+2i-1n-4w', id: '4161340083'}, 
    {class: 'Image on the Side', key: '-fb+5w+4e-db+86', id: '2325514239'}, 
    {class: 'Title Above', id: '7407570087', key: '-ef+6k-30-ac+ty'}, 
    {class: 'Text Only', key: '-gw-3+1f-3d+2z', id: '2848258416'}
  ]

  const templatesrow = templates.map(template=> {
    return <Addtemplate templatec={template} />
  })

  useEffect(()=> {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <div className="dashboardsales templatecont">
      <h3>Ads</h3>
      <div className="adssettings">
        <Switch title={`${googleads?'Disable':'Enable'} Google Ads`} updateInfo={()=> updateAdds()} checked={googleads}/>
      {
        googleads &&
        <>
        <h3 className='templatestitle'>Add Template</h3>
        <div className="adstemplate">
          {templatesrow}
        </div>
        </>
      }
        <ins class="adsbygoogle"
     style={{display:"block"}}
     data-ad-format="fluid"
     data-ad-layout-key="-fb+5w+4e-db+86"
     data-ad-client="ca-pub-8226434730839431"
     data-ad-slot="2797939913"></ins>
      </div>
    </div>
  )
}
export default Ads