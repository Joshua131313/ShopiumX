import React, { useContext, useState } from 'react'
import { ContextApp } from '../../../../../ContextAPI'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Appinput from '../../../../Reuseable/Appinput/Appinput'
import Appselect from '../../../../Reuseable/Appselect/Appselect'
import Product from './Product/Product'
import './Products.css'
import {TablePagination} from '@material-ui/core';
import Tablec from '../../../../Websitecontainer/Body/Bodyroutescomponents/Shop/Table/Table'
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom'
import Table from '../../../../Reuseable/Table'

const Products = (props) => {

  const {allproducts, clean} = useContext(ContextApp)
  const [category, setCategory] = useState('All')
  const [date, setDate] = useState('recent')
  const [keyword, setKeyword] = useState('')
  const pattern = new RegExp('\\b' + clean(keyword), 'i');

  const allproductsrow = allproducts.filter(x=>pattern.test(x.name) || pattern.test(x.type))?.map(product=> {
    return (
      <Product product={product}/>
    )
  })
  const filtered = allproducts
  .filter(x=> pattern.test(x.name) || pattern.test(x.type))
  .filter(x=> x.type.toLowerCase() === category.toLowerCase() || category === 'All')
  .sort((a, b)=> {
    if(date === 'recent') {
     return  b.date.toDate() - a.date.toDate()
    }
    else {
      return a.date.toDate() - b.date.toDate()
    }
})
  const categories = [
    {
      text: 'Men',
      value: 'men',
    },
    {
      text: 'Women',
      value: 'women',
    },
    {
      text: 'Boys',
      value: 'boys'
    },
    {
      text: 'Girls',
      value: 'girls'
    }
  ]

  const categoriesrow = categories.map(category=> {
    return (
      <option value={category.value}>{category.text}</option>
    )
  })
  return (
    <div className="allproducts">
      <h3 className='allproductstitle'>
        <span>All Products</span>
        <div className="productsbtns">
      
          <CSVLink filename='products.csv' data={allproducts}>
            <Appbtn 
              text='Export' 
              icon='fal fa-cloud-download-alt'
              className='reverse'
              />
           </CSVLink>
           <Link to='/dashboard/products/add'>
            <Appbtn 
              text='Add Product' 
              icon='fal fa-plus'
              className='reverse'
              />
            </Link>
        </div>
      </h3>
      <div className="filterdiv">
        <Appinput value={keyword} placeholder='Search' setValue={setKeyword}/>
        <div className="filterselects">
          <Appselect 
            defaultoption={{value: 'All', text: 'All'}}
            optionsrow={categoriesrow}
            value={category}
            setValue={setCategory}
            />
            <Appselect
            value={date}
            setValue={setDate} 
            defaultoption={{value: 'recent', text: 'Recently added'}}
            optionsrow={<><option value={'least'}>Least Recently added</option></>}
          />
        </div>
  
      </div>
      <div className="innerallproducts">
       <Table dashboard filtered={filtered} products={true}/>
      </div>
    </div>
  )
}
export default Products