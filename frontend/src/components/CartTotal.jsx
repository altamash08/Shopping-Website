import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className='w-full'>
      <Title text1={'CART'} text2={'TOTALS'} className='text-[length:1.4rem]' />

      <dl className='mt-5 divide-y divide-hair text-sm'>
        <div className='flex justify-between py-3'>
          <dt className='text-steel'>Subtotal</dt>
          <dd className='font-medium'>{currency} {getCartAmount()}.00</dd>
        </div>
        <div className='flex justify-between py-3'>
          <dt className='text-steel'>Shipping Fee</dt>
          <dd className='font-medium'>{currency} {delivery_fee}.00</dd>
        </div>
        <div className='flex items-baseline justify-between py-4'>
          <dt className='font-semibold'>Total</dt>
          <dd className='font-display text-[length:1.25rem] font-normal tracking-tight'>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</dd>
        </div>
      </dl>
    </div>
  )
}

export default CartTotal
