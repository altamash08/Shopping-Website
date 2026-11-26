import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])

  return (
    <section className='py-12 sm:py-16'>
      <div className='flex items-end justify-between gap-6'>
        <div>
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
          <p className='mt-3 max-w-md text-sm text-steel sm:text-base'>
            Fresh styles curated just for you.
          </p>
        </div>
        <Link to='/collection' className='shrink-0 text-sm font-semibold underline decoration-hair decoration-2 underline-offset-8 transition-colors hover:decoration-ink'>
          View all
        </Link>
      </div>

      {/* Rendering Products */}
      <div className='mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5'>
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </section>
  )
}

export default LatestCollection
