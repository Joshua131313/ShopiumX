import React from 'react'
import { HashLink } from 'react-router-hash-link'
import './Breadcrumbs.css'

const Breadcrumbs = (props) => {

  const {link, title} = props

  return (
    <div className="breadcrumbs">
        <h2>{title}</h2>
        <span className='breadlinks'>
          {
            link?.map((el, i)=> {
              if(el.text) {
                return (
                  <HashLink className='breadlink graytext' to={(el.link)&&`/${el.link}`}>
                  <span>
                  {el.text}
                  </span>
                  {(link.filter(x=> x.text).length-1 !== i)&&<i className='fal fa-chevron-right'></i>}
                  </HashLink>
                )
              }
            })
          }
        </span>
    </div>
  )
}
export default Breadcrumbs