import React from 'react'
import { Accordion } from '@material-ui/core';
import {AccordionSummary} from '@material-ui/core';
import {AccordionDetails} from '@material-ui/core';

const AccordionTab = (props) => {

  const {title} = props 

  return (
    <div className="accordiontab">
      <Accordion>
      <AccordionSummary
      className='accordionsummary'
          expandIcon={<i className='fal fa-chevron-right'></i>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {title}
        </AccordionSummary>
        <AccordionDetails className='accordioncont'>
            {props.children}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
export default AccordionTab