import React, { useState } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const Expand = (props) => {

  const {text, icon, notopen} = props
  const [expand, setExpand] = useState(!notopen)

  return (
    <>
    <Accordion className='accordion' expanded={expand}>
    <AccordionSummary
          onClick={()=> setExpand(!expand)}
          expandIcon={<i className='fal fa-chevron-up'></i>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         <h2>{text}</h2>
        </AccordionSummary>
        <AccordionDetails>
        {props.children}
        </AccordionDetails>
    </Accordion>

    {/* </div> */}
    </>
  )
}
export default Expand