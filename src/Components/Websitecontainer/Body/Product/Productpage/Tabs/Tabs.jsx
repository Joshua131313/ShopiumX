import React, {  useState } from 'react'
import './Tabs.css'

const Tabs = (props) => {
  const {links} = props
  const [activetab, setActivetab] = useState(links[0].link)

  const linksrow = links?.map(link=> {
    return (
      <div onClick={()=> setActivetab(link.link)} className={`${activetab === link.link?'activelink':''} link`}>
        {link.title}
      </div>
    )
  })
  const tabsroute = links?.map(content=> {
    if(activetab === content.link) {
      return (
        <div className={`tabs`}>
          <div className={`${content.link === activetab?'tab-enter-done':''} tab`}>
            <div className="tabcont">
             {content.content}
            </div>
          </div>
        </div>
        )
    }
  })

  return (
  <div className='sidetabs'>
    <div className="tablinks">
    {linksrow}
    </div>
    <div className="tabsroute">
    {tabsroute}
    </div>
  </div>
  )
}
export default Tabs
