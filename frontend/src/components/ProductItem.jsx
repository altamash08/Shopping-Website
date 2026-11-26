import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext);
    const second = image[1]

  return (
    <Link onClick={() => window.scrollTo(0, 0)} className='group block' to={`/product/${id}`}>
      <div className='tile aspect-[4/5] rounded-[22px]'>
        <img
          className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 ease-out ${second ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
          src={image[0]}
          alt={name}
          loading='lazy'
        />
        {second &&
          <img
            className='absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100'
            src={second}
            alt=''
            loading='lazy'
          />}
      </div>
      <div className='flex items-start justify-between gap-3 pt-3'>
        <p className='line-clamp-2 text-sm font-medium leading-snug'>{name}</p>
        <p className='whitespace-nowrap font-display text-[length:0.8rem] font-normal tracking-tight'>{currency}{price}</p>
      </div>
    </Link>
  )
}

export default ProductItem
