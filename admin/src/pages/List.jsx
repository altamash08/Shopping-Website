import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { TrashIcon } from '../components/Icons'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id, name) => {
    if (!window.confirm(`Remove "${name}"? This cannot be undone.`)) return
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <div className='flex items-end justify-between gap-4'>
        <h1 className='font-display text-[length:clamp(1.6rem,3vw,2.2rem)] font-light leading-tight tracking-[-0.03em]'>All products</h1>
        <p className='pb-1 text-sm text-steel'>{list.length} {list.length === 1 ? 'item' : 'items'}</p>
      </div>

      {list.length === 0
        ? <div className='mt-8 rounded-[26px] border border-dashed border-hair px-6 py-16 text-center'>
            <p className='font-display text-[length:1.2rem] font-light tracking-tight'>No products yet</p>
            <p className='mt-2 text-sm text-steel'>Products you add will show up here.</p>
          </div>
        : <ul className='mt-8 divide-y divide-hair border-y border-hair'>
            {
              list.map((item, index) => (
                <li className='grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-3 sm:grid-cols-[3.5rem_1fr_9rem_6rem_auto]' key={index}>
                  <div className='tile aspect-[4/5] rounded-xl'>
                    <img className='absolute inset-0 h-full w-full object-cover object-top' src={item.image[0]} alt='' />
                  </div>
                  <p className='min-w-0 text-sm font-medium'>{item.name}</p>
                  <p className='hidden text-sm text-steel sm:block'>{item.category} · {item.subCategory}</p>
                  <p className='hidden font-display text-[length:0.85rem] tracking-tight sm:block'>{currency}{item.price}</p>
                  <div className='flex items-center gap-2'>
                    <p className='font-display text-[length:0.85rem] tracking-tight sm:hidden'>{currency}{item.price}</p>
                    <button onClick={()=>removeProduct(item._id, item.name)} aria-label={`Remove ${item.name}`} className='icon-btn text-steel hover:text-ink'>
                      <TrashIcon />
                    </button>
                  </div>
                </li>
              ))
            }
          </ul>}
    </>
  )
}

export default List
