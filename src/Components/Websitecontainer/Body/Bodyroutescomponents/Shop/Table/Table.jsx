import { TablePagination } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../../../../ContextAPI';
import {TableContainer} from "@material-ui/core";
import Product from '../../../Product/Product';
import {Table} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import Productcontainer from '../../../Productscontainer/Productcontainer';
import './Table.css'
const Tablec = (props) => {
  const {allproducts} = useContext(ContextApp)
  const { filtered, page, grid, rowsPerPage, products, dashboard} = props



  return (
    <>

  <TableContainer component={Paper}>

  <Table>
   {products ?<Productcontainer dashboard={dashboard} grid={grid} array={
     filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
     } 
     nobtn
     />
    :
    <div className="reversed">
{      filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
}    </div>
  }
  </Table>
  </TableContainer>
  </>
  ) 
}
export default Tablec