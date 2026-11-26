import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

  return (
    <section id='best-sellers' className='scroll-mt-24 py-12 sm:py-16'>
      <Title text1={'BEST'} text2={'SELLERS'} />
      <p className='mt-3 max-w-lg text-sm text-steel sm:text-base'>
        Explore our best sellers, the most-loved pieces chosen for their unmatched style, comfort, and quality
      </p>

      <div className='mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5'>
        {
          bestSeller.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))
        }
      </div>
    </section>
  )
}

export default BestSeller
