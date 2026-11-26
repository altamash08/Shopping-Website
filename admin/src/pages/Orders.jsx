import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { PackageIcon } from '../components/Icons'

const statusColor = (status = '') => {
  const s = status.toLowerCase()
  if (s.includes('deliver') && !s.includes('out')) return 'bg-emerald-500'
  if (s.includes('out for') || s.includes('ship')) return 'bg-sky-500'
  return 'bg-amber-400'
}

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }


  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <div className='flex items-end justify-between gap-4'>
        <h1 className='font-display text-[length:clamp(1.6rem,3vw,2.2rem)] font-light leading-tight tracking-[-0.03em]'>Orders</h1>
        <p className='pb-1 text-sm text-steel'>{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
      </div>

      {orders.length === 0
        ? <div className='mt-8 rounded-[26px] border border-dashed border-hair px-6 py-16 text-center'>
            <p className='font-display text-[length:1.2rem] font-light tracking-tight'>No orders yet</p>
            <p className='mt-2 text-sm text-steel'>New orders will appear here.</p>
          </div>
        : <div className='mt-8 flex flex-col gap-4'>
        {
          orders.map((order, index) => (
            <article className='grid gap-5 rounded-[26px] border border-white/80 bg-white/55 p-5 text-sm shadow-soft md:grid-cols-[auto_2fr_1fr_auto] md:items-start md:gap-7 md:p-7 lg:grid-cols-[auto_2.4fr_1fr_5rem_11rem]' key={index}>
              <span className='hidden h-12 w-12 items-center justify-center rounded-full border border-hair bg-white/80 md:flex'>
                <PackageIcon />
              </span>
              <div>
                <div className='flex flex-col gap-0.5'>
                  {order.items.map((item, i) => (
                    <p key={i}>{item.name} <span className='whitespace-nowrap text-steel'>x {item.quantity}</span> <span className='ml-1 rounded-full border border-hair bg-white/70 px-2 py-0.5 text-xs font-semibold'>{item.size}</span></p>
                  ))}
                </div>
                <p className='mb-1 mt-4 font-semibold'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='text-steel'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  <p className='mt-1'>{order.address.phone}</p>
                </div>
              </div>
              <div className='flex flex-col gap-1 text-steel'>
                <p>Items: <span className='text-ink'>{order.items.length}</span></p>
                <p>Method: <span className='text-ink'>{order.paymentMethod}</span></p>
                <p>Payment: <span className='text-ink'>{ order.payment ? 'Done' : 'Pending' }</span></p>
                <p>Date: <span className='text-ink'>{new Date(order.date).toLocaleDateString()}</span></p>
              </div>
              <p className='font-display text-[length:1.15rem] font-normal tracking-tight'>{currency}{order.amount}</p>
              <div className='flex items-center gap-3'>
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusColor(order.status)}`} aria-hidden='true'></span>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} aria-label='Order status' className='select w-full'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </article>
          ))
        }
      </div>}
    </div>
  )
}

export default Orders
