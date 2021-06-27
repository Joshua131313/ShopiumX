import React, {useContext, useEffect} from 'react'
import { sumSales, sumExpenses } from '../../../../../Appfunctions'
import { ContextApp } from '../../../../../ContextAPI'
import Chart from '../../Elements/Chart/Chart'
import Container from '../../Elements/Container/Container'
import Detailcard from '../../Elements/Detailcard/Detailcard'
import './Home.css'
import Products from './Products'
import ReactTimeAgo from 'react-time-ago'
import User from '../../../../Reuseable/User/User'
import Reuseableuser from '../../../../Reuseable/User/Reuseableuser'
const Home = () => {

  const {orders, allusers, allproducts, allgiftcards} = useContext(ContextApp)

  const detailcards = [
    {
      text: 'New Orders',
      amount: orders.length,
      icon: 'fal fa-shopping-bag',
      charttype: 'area',
      color: '#e1a9f6',
      chartdata: [],
      curve: 'smooth',
      bg: '#8861e0'
    },
    {
      text: 'Total Sales',
      amount: sumSales(orders).toFixed(2),
      icon: 'fal fa-dollar-sign',
      charttype: 'bar',
      color: '#fff',
      chartdata: [],
      money: true,
      curve: 'straight',
      bg: '#1ed897',
    },
    {
      text: 'Total Expense',
      amount: sumExpenses(orders, allproducts).toFixed(2),
      icon: 'fal fa-file-invoice-dollar',
      charttype: 'area',
      color: '#fff',
      chartdata: [],
      money: true,
      curve: 'straight',
      bg: '#2196f3',
    },
    {
      text: 'All Members',
      amount: allusers.length,
      icon: 'fal fa-users',
      charttype: 'area',
      curve: 'straight',
      color: '#ffd205',
      chartdata: [],
      bg: '#ffaf02'
    },
  ]
  const containers = [

    {
      title: 'Most Selling Products',
      render: 
      <>
        <Products products={allproducts.sort((a, b)=> b.sold-a.sold).slice(0, 4)}/>
      </>,
      className: 'half'
    },
    {
      title: 'Least Selling Products',
      render: 
      <>
        <Products products={allproducts.sort((a, b)=> a.sold-b.sold).slice(0, 4)}/>
      </>,
      className: 'half'
    },
    {
      title: 'Recent Order Activity',
      render: 
      <>
        {
          orders.slice(0, 5).map(order=> {
            return (
                <div className='quickorderview'>
                  <div className="leftview">
                    <i className='fal fa-cash-register containericon'></i>
                    <h3>
                      <span>Ordered</span>
                      <span className="amountorder">${order.ordercost.toFixed(2)}</span>
                    </h3>
                  </div>
                  <div className="rightview">
                  {(typeof order.date.toDate !== 'function')?'':<ReactTimeAgo date={order.date.toDate()}/>}
                  </div>
                </div>
            )
          })
        }
      </>
    },
    {
      title: 'Gift Card Sales',
      render: 
      <>
        {
          allgiftcards.slice(0, 5).map(giftcard=> {
            return (
            <div className="giftcardd quickorderview">
              <div className="leftview">
                <i className='fal fa-gift-card containericon'></i>
                <h3 >
                  <span>Bought</span>
                  <span className="amountorder">${giftcard.paid.toFixed(2)}</span>
                </h3>
              </div>
              <div className="rightview">
              {(typeof giftcard.date?.toDate !== 'function')?'':<ReactTimeAgo date={giftcard.date.toDate()}/>}
              </div> 
            </div>
            )
          })
        }
      </>
    },
    {
      title: 'Recent Buyers',
      render: 
      <>
        {
        allusers.filter(x=> orders.sort((a, b)=> a.date.toDate()-b.date.toDate()).some(el=> x === el.userid))
         .map(el=> {
           return (
             <Reuseableuser user={el}/>
           )
         })
        }
      </>
    }
  ]

  const containersrow = containers.slice(0, 2).map(container=> {
    return (
      <Container title={container.title} className={container.className}>
        {container.render}
      </Container>
    )
  })
  const secondcontainersrow = containers.slice(2, 5).map(el=> {
     return (
      <Container title={el.title}>
        {el.render}
      </Container>
     )
  })

  const detailcardsrow = detailcards.map(detailcard=> {
    return (
      <Detailcard detailcard={detailcard}/>
    )
  })


  return (
    <div className="dashboardhome">
      <div className="detailcardscont">
        {detailcardsrow}
      </div>
      <div className="gridcontainers">
        <div className="halfcont">
          {containersrow}
        </div>
        <div className="thirdcont">
          {secondcontainersrow}
        </div>
      </div>
    </div>
  )
}
export default Home