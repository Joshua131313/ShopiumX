import React from 'react' 
import { Route } from 'react-router-dom'
import Adress from '../Routescomponents/Adress'
import Details from '../Routescomponents/Details'
import Orders from '../Routescomponents/Orders'
import Payment from '../Routescomponents/Payment'
import Settings from '../Routescomponents/Settings'
import Ratings from '../Routescomponents/Ratings'
const Routestab = (props) => {

  const {links, userRatings} = props

  const routesrow = links.map(link=>{
    const components = {
      Adress, Details, Orders, Payment, Settings, Ratings
    }
    
    const Component = components[link.component]

    return (
      <Route exact path={`/website/profile${link.link}`}>
          <div className={link.text+' accountroute'}>
              <h3>{link.text}</h3>
              <Component link={link} userRatings={userRatings}/>
          </div>
      </Route>
    )
  })

  return (
    <div className="routestab">
     {routesrow}
    </div>
  )
}
export default Routestab