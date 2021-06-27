import React from 'react'
import Appselect from '../../../Reuseable/Appselect/Appselect'


const Pagetemplate = (props) => {
  const {className, optionsrow, title, sort, setSort, defaultoption} = props
  return (
    <div className={"pagetemplate templatecont "+className}>
     
     <h3 className='sorttitle'>
        <span>{title}</span>
        <Appselect optionsrow={optionsrow} value={sort} setValue={setSort} defaultoption={defaultoption}/>
      </h3>
      <div className="innergiftcards">
        {props.children}
      </div>
    </div>
  )
}
export default Pagetemplate