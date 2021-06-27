import React from 'react'
import { allsizes, colornames } from '../../../../../Appconstants'
import Appbtn from '../../../../Reuseable/Appbtn/Appbtn'
import Filterexpand from './Filterexpand/Filterexpand'

const Filtersidebar = (props) => {
  const {
    price, setPrice, 
    gender, setGender, 
    categories, setCategories, 
    colors, setColors, 
    sizes, setSizes, 
    resetFilters, filterby} = props

  const moreoptions = [
    {
      title: 'Group',
      list: ['Men', 'Women', 'Boys', 'Girls','Unisex'],
      setState: setGender,
      state: gender
    },
    {
      title: 'Categories',
      list: ['Pants', 'Shorts', 'Jeans', 'Shirts'],
      setState: setCategories,
      state: categories
    },
    {
      title: 'Sizes',
      list: allsizes,
      setState: setSizes,
      state: sizes
    },
    {
      title: 'Colors',
      list: colornames,
      state: colors,
      setState: setColors
    },
    {
      title: 'Price Range',
      list: [[0, 50], [50, 100], [100, 150], [200, 250], [250, Infinity]],
      setState: setPrice,
      state: price
    }
  ] 
  const filterexpandrow = moreoptions?.map(col=> {
    if(filterby  === '' || filterby ==='arrivals' || filterby.toLowerCase() ==='kids' || col.title !=='Group') {
      return (
        <Filterexpand col={col} filterby={filterby}/>
      )
    }
  })

  return (
    <div className="filtersidebar">
      <h2>Filters:</h2>
      {filterexpandrow}
      <Appbtn text='Reset' clickEvent={()=> resetFilters()}/>
    </div>
  )
}
export default Filtersidebar