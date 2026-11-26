import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { TrashIcon, PlusIcon, MinusIcon } from '../components/Icons';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, token } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  // Guests must sign in first; Login sends them back to checkout afterwards
  const goToCheckout = () => {
    if (!token && !localStorage.getItem('token')) {
      toast.info('Please sign in to continue to checkout')
      navigate('/login', { state: { from: '/place-order' } })
      return
    }
    navigate('/place-order')
  }

  return (
    <div className='pb-6 pt-10 sm:pt-14'>

      <Title text1={'YOUR'} text2={'CART'} as='h1' />

      {cartData.length === 0
        ? <div className='mt-10 rounded-[28px] border border-dashed border-hair px-6 py-20 text-center'>
            <p className='font-display text-[length:1.3rem] font-light tracking-tight'>Your cart is empty</p>
            <p className='mt-2 text-sm text-steel'>Pick something you like and it will show up here.</p>
            <Link to='/collection' className='btn btn-primary mt-8'>Browse the collection</Link>
          </div>
        : <div className='mt-10 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14'>

            <ul className='divide-y divide-hair border-y border-hair'>
              {
                cartData.map((item, index) => {

                  const productData = products.find((product) => product._id === item._id);

                  return (
                    <li key={index} className='flex items-center gap-4 py-5 sm:gap-6'>
                      <div className='tile aspect-[4/5] w-20 shrink-0 rounded-2xl sm:w-24'>
                        <img className='absolute inset-0 h-full w-full object-cover object-top' src={productData.image[0]} alt='' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='text-sm font-medium sm:text-base'>{productData.name}</p>
                        <div className='mt-2 flex items-center gap-3'>
                          <p className='font-display text-[length:0.85rem] tracking-tight'>{currency}{productData.price}</p>
                          <p className='rounded-full border border-hair bg-white/60 px-3 py-0.5 text-xs font-semibold'>{item.size}</p>
                        </div>
                        <div className='mt-3 inline-flex items-center rounded-full border border-hair bg-white/60'>
                          <button
                            aria-label='Decrease quantity'
                            disabled={item.quantity <= 1}
                            onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                            className='flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40'
                          >
                            <MinusIcon className='h-4 w-4' />
                          </button>
                          <span className='min-w-[2rem] text-center text-sm font-semibold' aria-live='polite'>{item.quantity}</span>
                          <button
                            aria-label='Increase quantity'
                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                            className='flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white'
                          >
                            <PlusIcon className='h-4 w-4' />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        aria-label={`Remove ${productData.name}`}
                        className='icon-btn shrink-0 text-steel hover:text-ink'
                      >
                        <TrashIcon />
                      </button>
                    </li>
                  )

                })
              }
            </ul>

            <div className='self-start lg:sticky lg:top-24'>
              <div className='glass rounded-[28px] p-6 sm:p-8'>
                <CartTotal />
                <button onClick={goToCheckout} className='btn btn-primary mt-4 w-full'>{(token || localStorage.getItem('token')) ? 'Proceed to checkout' : 'Sign in to checkout'}</button>
              </div>
            </div>

          </div>}

    </div>
  )
}

export default Cart
