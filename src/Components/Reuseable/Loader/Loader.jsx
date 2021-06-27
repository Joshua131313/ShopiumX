import React from 'react'

const Loader = (props) => {

  const {loaded} = props


  return (
    <>
    {loaded?
    props.children 
      :
      <div className="loader">
        loader
      </div>
      }
    </>
  )

}
export default Loader