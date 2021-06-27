import React, { useContext, useState } from 'react'
import { ContextApp } from '../../../../../../ContextAPI'
import { db } from '../../../../../../Fire'
import { addNotification } from '../../../../../Reuseable/Addnotification/Addnotification'
import Appbtn from '../../../../../Reuseable/Appbtn/Appbtn'
import Appinput from '../../../../../Reuseable/Appinput/Appinput'
import Appselect from '../../../../../Reuseable/Appselect/Appselect'
import Imgupload from '../../../../../Reuseable/Imgupload/Imgupload'
import Textarea from '../../../../../Reuseable/Textarea/Textarea'
import Sizes from './Sizes'
import firebase from 'firebase'
import Coupons from './Coupons'
import Deletebtn from './Deletebtn'
import Checkbox from '../../../../../Reuseable/Checkbox/Checkbox'
import { useHistory } from 'react-router-dom'
const Editproduct = (props) => {
  const {allproducts, notifisystem, addNoti} = useContext(ContextApp)
  const {product, add} = props
  const [name, setName] = useState(product?product.name:'')
  const [price, setPrice] = useState(product?product.price:'')
  const [cost, setCost] = useState(product?product.cost:'')
  const [season, setSeason] = useState(product?product.season:'')
  const [type, setType] = useState(product?product.type:'')
  const [description, setDescription] = useState(product?product.description:'')
  const [sdescription, setSdescription] = useState(product?product.shortdescription:'')
  const [img, setImg] = useState(product?product.img:'')
  const [imgs, setImgs] = useState(product?product.imgs:[])
  const [sizes, setSizes] = useState(product?product.sizes:[])
  const [coupons, setCoupons] = useState(product?product.coupons: [])
  const [sale, setSale] = useState(product?product.sale:false)
  const [percent, setPercent] = useState(product?product.percent:0)
  const history = useHistory()
  
  const seasons = [
    'Fall',
    'Winter',
    'Spring',
    'Summer'
  ]
  const types = [
    'Women',
    'Men',
    'Boys',
    'Girls'
  ]
  const seasonoptions = seasons.map(season=> {
    return (
      <option value={season}>
        {season}
      </option>
    )
  })
  const typeoptions = types.map(type=> {
    return (
      <option value={type}>
        {type}
      </option>
    )
  })
  const updateImg = (url) => {
    setImg(url)
  };
  const imgUploader = (i) => {

    const pushImg = (url) => {
      let tempImgs = [...imgs]
      if(tempImgs.lnegth <4) {
        tempImgs.push(url)
      }
      else {
        tempImgs[i] = url
      }
      setImgs(tempImgs)
    }
    return (
            <Imgupload 
             icon='fal fa-upload'  
             img={imgs[i]}
             updateImg={pushImg}
             />
    )
  } 


  const  handleUpdateProduct = () => {
    allproducts.forEach(productc=> {
      if(productc.id === product.id) {
        const index = allproducts.indexOf(productc)
        allproducts[index].name = name
        allproducts[index].price = price
        allproducts[index].cost = cost
        allproducts[index].sizes = sizes
        allproducts[index].season = season
        allproducts[index].type = type
        allproducts[index].descriptipn = description
        allproducts[index].shortdescription = sdescription
        allproducts[index].img = img
        allproducts[index].imgs = imgs.filter(x=> x)
        allproducts[index].coupons = coupons.filter(x=> (x.couponcode || x.discount))
        db.collection('products').doc('products').update({
          products: allproducts
        })
        .then(()=> {
          addNoti('Product was successfully edited!','fal fa-check-circle')
        })
        .catch(()=>{
          addNoti('Try again later!', 'fal fa-exclamation-circle')
        })
      }
    })
  }
  const handleDeleteProduct = () => {
    allproducts.forEach(productc=> {
      if(productc.id === product.id) {
        const index = allproducts.indexOf(productc)
        allproducts.splice(index, 1)
        db.collection('products').doc('products').update({
          products: allproducts
        })
        .then(()=>{
          addNoti('Product was deleted!', 'fal fa-check-circle')
          history.push('/dashboard/products')
        })
        .catch(()=> {
          addNoti('Try again later!', 'fal fa-exclamation-circle')
        })
      }
    })
  }
  const handleAddProduct = () => {
   if(name && price && sizes && type && description && season && imgs && img) {
    db.collection('products').doc('products').update({
      products: firebase.firestore.FieldValue.arrayUnion({
        name,
        price: parseFloat(price),
        sizes,
        userratings: [],
        type,
        shortdescription: sdescription,
        description,
        season, 
        sale,
        reviews: [], 
        percent,
        imgs: imgs.filter(x=> x), 
        img,
        id: db.collection('users').doc().id,
        coupons: coupons.filter(x=> (x.couponcode || x.discount)),
        date: new Date()
      })
    })
    .then(()=> {
      addNoti('Product successfully added!', 'fal fa-check-circle')
      clearStates()
    })
    .catch(()=> {
      addNoti('Try again later!', 'fal fa-exclamation-circle')
    })
   }
   else {
     addNoti('Complete the form to add a product', 'fal fa-exclamation-circle')
   }
  }
  const clearStates = () => {
    setName('')
    setPrice('')
    setSizes([])
    setType('')
    setSdescription('')
    setDescription('')
    setSeason('')
    setSale(false)
    setPercent(0)
    setImgs([])
    setImg('')
    setCoupons([])
  }
  return (
    <div className='editproduct'>
      <div className='productdetailsedit'>
        <div className="imguploaders">
          <div className="mainimg">
            <Imgupload icon='fal fa-upload' img={img} updateImg={updateImg}/>
          </div>
          <div className="subimgs">
            {imgUploader(0)}
            {imgUploader(1)}
            {imgUploader(2)}
            {imgUploader(3)}
          </div>
        </div>
        <h3>Product Details</h3>
        <Appinput text placeholder='Product Name' value={name} setValue={setName}/>
        <Appinput text placeholder='Sale Price' value={price} setValue={setPrice}/>
        <Appinput text placeholder='Cost to Produce' value={cost} setValue={setCost}/>
        <h3>Sale</h3>
        <div className="salecontrol">
          <Checkbox checked={sale} setChecked={setSale} text='On Sale (%OFF):'/>
          {sale&&<Appinput value={percent} setValue={setPercent} placeholder='% OFF' type='number'/>}
        </div>
        <Coupons coupons={coupons} setCoupons={setCoupons}/>
        <Sizes sizes={sizes} setSizes={setSizes}/>
        <h3>Categories</h3>
        <div className='cc'>
          <small>Season</small>
         <Appselect value={season} setValue={setSeason} optionsrow={seasonoptions} defaultoption={{value: '', text: 'Select a Season'}}/>
        </div>
        <div className='cc'>
          <small>Type</small>
         <Appselect value={type} setValue={setType} optionsrow={typeoptions}  defaultoption={{value: '', text: 'Select a Type'}}  />
        </div>
        <h3>Descriptions</h3>
        <div className='cc'>
          <small>Description</small>
          <Textarea value={description} setValue={setDescription} placeholder='Description'/>
        </div>
        <div className='cc'>
          <small>Short Description</small>
          <Textarea value={sdescription} setValue={setSdescription} placeholder='Short Description'/>
        </div>
        <div className="controltns">
         {
         !add?<> 
          <Appbtn text='Save Product' clickEvent={()=> handleUpdateProduct()}/>
          <Appbtn text='Delete Product' clickEvent={()=> handleDeleteProduct()}/>
         </>
         :
          <>
          <Appbtn text='Add Product' clickEvent={()=> handleAddProduct()}/>
          <Appbtn text='Clear Form' clickEvent={()=> clearStates()}/>
          </>
        }
        </div>
      </div>
    </div>
  )
}
export default Editproduct