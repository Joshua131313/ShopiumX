import React, { useContext, useEffect, useState } from 'react'
import Filterbanner from '../Filtercontainers/Filterbanner'
import {TablePagination} from '@material-ui/core';
import Table from './Table/Table';
import { ContextApp } from '../../../../../ContextAPI';
import { filterHighRating, filterHighSale, filterHighToLow, filterLowToHigh } from '../../../../../Appfunctions';
import './Shop.css'
import Filtersidebar from '../Filtercontainers/Filtersidebar';
import stringSimilarity from 'string-similarity'
import { useLocation } from 'react-router-dom';
import Tablec from './Table/Table';

const Shop = (props) => {
  const {allproducts, setBreadcrumbs, setFilterkeyword, filterkeyword, pattern, clean} = useContext(ContextApp)
  const {filterby} = props
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [price, setPrice] = useState([0, Infinity])
  const [filterorder, setFilterorder] = useState('cheapest')
  const [filtered, setFiltered] = useState([])
  const [page, setPage] = useState(0);
  const [grid, setGrid] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [categories, setCategories] = useState([])
  const [gender, setGender] = useState([])
  const [searchquery, setSearchquery] = useState('')
  const location = useLocation()
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const resetFilters = () => {
    setGender([])
    setPrice([0, Infinity])
    setFilterorder('cheapest')
    setCategories([])
    setSizes([])
    setColors([])
  }

  useEffect(()=>{
    return ()=>{
      setFilterkeyword('')
    }
  },[])
  useEffect(()=>{
    setSearchquery(location.search.split('=')[1]??'')
  },[location])
  
  useEffect(()=>{
    const filteredprod = 
    allproducts
    .filter(x=> x.sizes.some(x=> (sizes.includes(x.size.toLowerCase()) || sizes.length === 0) && x.colors.some(el=> (colors.length ===0||colors.includes(el.color.toLowerCase())))))
    .filter(x=> x.price > price[0] && x.price < price[1])
    .filter(x=> gender.includes(x.type.toLowerCase())|| gender.length === 0)
    .filter(x=> categories.some(el=> stringSimilarity.compareTwoStrings(el, x.name) >= 0.3) || categories.length === 0)
    .filter(x=> (stringSimilarity.compareTwoStrings(x.name, searchquery)>= 0.30) || searchquery ==='' || pattern.test(clean(x.name)) )
    .filter(x=>x.type.toLowerCase() === filterby || filterby ==='' || (x.sale && filterby ==='sale')|| (x.season.toLowerCase() ==='trending' && filterby === 'arrivals') || ((x.type.toLowerCase() === 'girls' || x.type.toLowerCase() ==='boys') && filterby ==='kids'))
    if(filterorder === 'cheapest') { 
      setFiltered(
        filterLowToHigh(filteredprod)
      )     
    } 
    else if(filterorder === 'expensive') {
      setFiltered(
        filterHighToLow(filteredprod)
      )
    }else if(filterorder === 'rating') {
     setFiltered(
      filterHighRating(filteredprod)
     )
    }else if(filterorder === 'sale') {
     setFiltered(
      filterHighSale(filteredprod)
     )
    }

 
  },[sizes, colors, price, filterorder, gender, categories, filterby, pattern, searchquery])


  return (
    <div className="shop">
      <Filterbanner 
        colors={colors} setColors={setColors}
        sizes={sizes} setSizes={setSizes}
        price={price} setPrice={setPrice}
        filterorder={filterorder} setFilterorder={setFilterorder}
        filtered={filtered} setFiltered={setFiltered}
        setPage={setPage}
      />    
      <div>
       <div className="view">
        <i className={`fal fa-th-large ${!grid&&'active'}`} onClick={()=> setGrid(false)}></i>
        <i className={`fal fa-th ${grid&&'active'}`} onClick={()=> setGrid(true)}></i>
       </div> 
       <TablePagination 
        component='div'
        count={filtered.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, 25, filtered.length].filter(x=> x <= filtered.length)}
        labelRowsPerPage='Products Per Page'
       />
       </div>
      <div className="sidebannerproducts">
      <div className='spacersidebar'>
      <Filtersidebar 
        price={price}
        gender={gender}
        categories={categories}
        colors={colors}
        sizes={sizes}
        setColors={setColors} 
        setSizes={setSizes} 
        setPrice={setPrice}
        setCategories={setCategories}
        setGender={setGender}
        resetFilters={resetFilters}
        filterby={filterby}
      />
      </div>
      <Tablec 
        products
        filtered={filtered}
        page={page} 
        grid={grid}
        rowsPerPage={rowsPerPage}
       />
    
      </div>
    </div>
  )
}
export default Shop