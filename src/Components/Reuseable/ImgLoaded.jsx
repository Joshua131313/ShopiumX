import React, {useState} from 'react'

const ImgLoaded = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const {img, skeletonclass=''} = props

  return (
    <>
    <img onLoad={()=> setIsLoaded(true)} src={img} alt="" style={isLoaded?{display: 'block'}:{display: 'none'}}/>
    <div className={"rskeletonimg "+skeletonclass} style={!isLoaded?{display: 'block'}:{display: 'none'}}></div>
    </>
  )
}
export default ImgLoaded