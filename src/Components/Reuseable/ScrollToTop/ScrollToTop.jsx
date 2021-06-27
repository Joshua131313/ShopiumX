import React, { useEffect } from 'react'
import { useLocation, withRouter } from 'react-router-dom'


const ScrollToTop = ({history}) => {
  const location = useLocation()

  let {pathname } = location;
  useEffect(()=>{
    const unlisten = history.listen(()=>{
      if(!pathname.includes('profile')) {
        window.scrollTo(0, 0)
      }
    })
    return () => {
      unlisten()
    }
  },[pathname])
  return null
}
export default withRouter(ScrollToTop)