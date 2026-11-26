import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const categories = ['Women', 'Men', 'Kids']

// Quick way in: one tile per category, using a real product photo from the catalogue
const CategoryTiles = () => {

  const { products } = useContext(ShopContext)

  if (!products.length) return null

  return (
    <section className='py-12 sm:py-16'>
      <Title text1={'SHOP BY'} text2={'CATEGORY'} />
      <div className='mt-8 grid grid-cols-3 gap-3 sm:gap-5'>
        {categories.map((cat) => {
          const items = products.filter((p) => p.category === cat)
          const cover = items.find((p) => p.image && p.image[0])
          return (
            <Link
              key={cat}
              to='/collection'
              state={{ category: cat }}
              onClick={() => window.scrollTo(0, 0)}
              className='group tile block aspect-[3/4] rounded-[20px] sm:rounded-[28px]'
            >
              {cover &&
                <img
                  src={cover.image[0]}
                  alt=''
                  loading='lazy'
                  className='absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105'
                />}
              <span className='glass absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-full py-2 pl-3 pr-3 text-xs font-semibold sm:inset-x-4 sm:bottom-4 sm:py-2.5 sm:pl-5 sm:pr-5 sm:text-sm'>
                {cat}
                <span className='hidden font-medium text-steel sm:inline'>{items.length} styles</span>
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default CategoryTiles
