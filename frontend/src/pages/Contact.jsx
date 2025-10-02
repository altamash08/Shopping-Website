import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] rounded-xl shadow-md transition-transform duration-500 hover:scale-105' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray600'>Our Store</p>
          <p className='text-gray-500'>12 MG Road, Near Metro Station <br/> Bengaluru, Karnataka – 560001</p>
          <p className='text-gray-500'>Tel:+91-212-456-7890 <br/> Email: contact@justbuyy.in</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at JustBuyy</p>
           <p className='text-gray-500'>Discover our teams and explore career opportunities</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white hover:rounded-[20px] transition-all duration-500'>Find Your Role</button>

        </div>

      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
