import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

// Dot colour is only a hint, the status is always written out too
const statusColor = (status = '') => {
  const s = status.toLowerCase()
  if (s.includes('deliver') && !s.includes('out')) return 'bg-emerald-500'
  if (s.includes('out for') || s.includes('ship')) return 'bg-sky-500'
  return 'bg-amber-400'
}

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }

    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='pb-6 pt-10 sm:pt-14'>

        <Title text1={'MY'} text2={'ORDERS'} as='h1' />

        {!loading && !token && !localStorage.getItem('token')
          ? <div className='mt-10 rounded-[28px] border border-dashed border-hair px-6 py-20 text-center'>
              <p className='font-display text-[length:1.3rem] font-light tracking-tight'>Sign in to see your orders</p>
              <p className='mt-2 text-sm text-steel'>Your order history is saved to your account.</p>
              <Link to='/login' className='btn btn-primary mt-8'>Sign in</Link>
            </div>
          : !loading && orderData.length === 0
          ? <div className='mt-10 rounded-[28px] border border-dashed border-hair px-6 py-20 text-center'>
              <p className='font-display text-[length:1.3rem] font-light tracking-tight'>No orders yet</p>
              <p className='mt-2 text-sm text-steel'>Your orders will appear here once you place one.</p>
              <Link to='/collection' className='btn btn-primary mt-8'>Start shopping</Link>
            </div>
          : <ul className='mt-10 divide-y divide-hair border-y border-hair'>
              {
                orderData.map((item,index) => (
                  <li key={index} className='flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between'>
                      <div className='flex items-start gap-5'>
                          <div className='tile aspect-[4/5] w-20 shrink-0 rounded-2xl'>
                            <img className='absolute inset-0 h-full w-full object-cover object-top' src={item.image[0]} alt='' />
                          </div>
                          <div className='text-sm'>
                            <p className='font-medium sm:text-base'>{item.name}</p>
                            <div className='mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-steel'>
                              <p className='font-medium text-ink'>{currency}{item.price}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Size: {item.size}</p>
                            </div>
                            <p className='mt-2 text-steel'>Date: <span className='text-ink'>{new Date(item.date).toDateString()}</span></p>
                            <p className='mt-0.5 text-steel'>Payment: <span className='text-ink'>{item.paymentMethod}</span></p>
                          </div>
                      </div>
                      <div className='flex items-center justify-between gap-6 md:w-1/2 md:justify-end md:gap-10'>
                          <div className='flex items-center gap-2.5'>
                              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusColor(item.status)}`} aria-hidden='true'></span>
                              <p className='text-sm font-medium'>{item.status}</p>
                          </div>
                          <button onClick={loadOrderData} className='btn btn-ghost h-11'>Track order</button>
                      </div>
                  </li>
                ))
              }
            </ul>}
    </div>
  )
}

export default Orders
