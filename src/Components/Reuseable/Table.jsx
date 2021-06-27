import { TablePagination } from '@material-ui/core'
import React, {useState} from 'react'
import Tablec from '../Websitecontainer/Body/Bodyroutescomponents/Shop/Table/Table'

const Table = (props) => {
  const {filtered, products, grid} = props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  return (
    <>
      <TablePagination 
          component='div'
          count={filtered.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 20, 25, filtered.length].filter(x=> x < filtered.length)}
          labelRowsPerPage='Items Per Page'
        />
           
      <Tablec 
       products={products}
        filtered={filtered}
        page={page} 
        dashboard
        grid={grid}
        rowsPerPage={rowsPerPage}
       />
    </>
  )
}
export default Table