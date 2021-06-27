import React, { useState, useRef, useContext } from 'react'
import firebase from 'firebase'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Imgupload.css'
import Imguploadskeleton from './Imguploadskeleton';
const Imgupload = (props) => {

  const {icon, img, randomid=true, updateImg, show=false} = props
  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(0)
  const {user} = useContext(ContextApp)
  const filename = randomid?db.collection('users').doc().id:'profileimg'
  const [loaded, setLoaded] = useState(false)

  function uploadImg(e) {
    let file = e.target.files[0]
    if(file) {
      
    const storageRef = firebase
    .storage()
    .ref(`${user.uid}/images`)
    .child(filename)
    const task = storageRef.put(file)
    task.on(
      "state_changes",
      function progress(snap) {
        setLoading(true);
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setPercent(percentage)
      },
      function error() {
        window.alert('Try Again!')
      },
      function complete() {
        setLoading(false);
        storageRef.getDownloadURL().then((url) => {
          updateImg(url)
          setLoaded(false)
        });
       
      }
    )
    }
  }
  return (
    <label className='imgupload'>
      <input type='file'
        style={{display: 'none'}}
        onChange={(e)=>uploadImg(e)}
      />

    <div className="imgloader" >
      {
        !loading?
        <>
        <div className='imgcontupload' style={!loaded?{display: 'none'}:{}}>
            {img&&<img onLoad={()=> setLoaded(true)} src={img} alt=""/>}
        
        </div>
        </>
        :
        <div className='circle'>
          <CircularProgressbar value={percent} strokeWidth={1}/>
        </div>
      } 
       {((!img && !loading) ||show) && <i className={icon}></i>}
    </div>
    <Imguploadskeleton style={(loaded || loading)?{display: 'none'}:{}}/>
    
    </label>
  )
}
export default Imgupload