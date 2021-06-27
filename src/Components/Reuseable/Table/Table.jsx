import React from 'react'
import './Table.css'

const Table = (props) => {

  const {header, rows} = props

  return (
    <table className='apptable'>
      {props.children}
    </table>
  )
}
export default Table