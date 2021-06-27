import React, { useContext, useState, useEffect } from 'react'
import { convertDateToString, sortArr } from '../../../../../Appfunctions'
import { ContextApp } from '../../../../../ContextAPI'
import AccordionTab from '../../../../Reuseable/Accordion/Accordion'
import Appselect from '../../../../Reuseable/Appselect/Appselect'
import Table from '../../../../Reuseable/Table'
import Pagetemplate from '../Pagetemplate'
import Giftcard from './Giftcard'
import './Giftcards.css'
import Innergiftcard from './Innergiftcard'
const Giftcards = (props) => {

  const {allgiftcards} = useContext(ContextApp)
  const [results, setResults] = useState([])
  const [sort, setSort] = useState('fromuserid')
   let map = new Map
  //  Object.entries(bucketed).map((key, val)=> {
  //   console.log(key[0])
  //   console.log(key[1])
  // })
  const allgiftcardsrow = Object.entries(results).map(buyer=> {
    return (
       <Giftcard sort={sort}  cards={buyer[1]} id={buyer[0]}>
        { buyer[1].map(card=> {
            return (
              <Innergiftcard card={card} sort={sort}/>
            )
          })}
       </Giftcard>
    )
  })

  const handleSort = () => {
  }
  const sortoptions = [
    {
      value: 'touserid',
      text: 'Arrange by Receiver'
    }, 
    {
      value: 'date',
      text: 'Arrange by Date'
    }
  ]
  const optionsrow = sortoptions.map(option=> {
    return (
      <option value={option.value}>{option.text}</option>
    )
  })
  const giftcardrow = allgiftcards.map(giftcard=> {
    return (
      <AccordionTab 
      title={giftcard.from}
      >

      </AccordionTab>
    ) 
  })
 

  useEffect(()=> {
    
    setResults(sortArr(allgiftcards, sort))

  }, [allgiftcards, sort])

  return(
    // <div className="giftcards templatecont">
    //   <h3 className='sorttitle'>
    //     <span>Sold Gift Cards</span>
    //     <Appselect optionsrow={optionsrow} value={sort} setValue={setSort} defaultoption={{value: 'fromuserid', text: 'Arrange by Buyer'}}/>
    //   </h3>
    //   <div className="innergiftcards">
    //   {allgiftcardsrow}
    //   </div>
    // </div>
    <Pagetemplate
      className='giftcards'
      title='Sold Gift Cards' 
      sort={sort}
      setSort={setSort}
      optionsrow={optionsrow}
      defaultoption={{value: 'fromuserid', text: 'Arrange by Buyer'}}>
        <Table filtered={allgiftcardsrow} />
    </Pagetemplate>
  )
}
export default Giftcards
