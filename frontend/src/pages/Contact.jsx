import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className='pt-10 sm:pt-14'>
      <Title text1={'CONTACT'} text2={'US'} as='h1' />

      <div className='mt-10 grid gap-10 md:grid-cols-[minmax(0,28rem)_1fr] md:gap-16'>
        <div className='tile aspect-square rounded-[32px] shadow-soft'>
          <img className='absolute inset-0 h-full w-full object-cover' style={{ mixBlendMode: 'normal' }} src={assets.contact_img} alt='' />
        </div>
        <div className='flex flex-col justify-center items-start gap-6 text-steel'>
          <h2 className='font-display text-[length:1.25rem] font-light tracking-tight text-ink'>Our Store</h2>
          <p>12 MG Road, Near Metro Station <br/> Bengaluru, Karnataka – 560001</p>
          <p>
            Tel: <a href='tel:+912124567890' className='text-ink underline decoration-hair decoration-2 underline-offset-4 hover:decoration-ink'>+91-212-456-7890</a> <br/>
            Email: <a href='mailto:contact@justbuyy.in' className='text-ink underline decoration-hair decoration-2 underline-offset-4 hover:decoration-ink'>contact@justbuyy.in</a>
          </p>
          <h2 className='mt-4 font-display text-[length:1.25rem] font-light tracking-tight text-ink'>Careers at JustBuyy</h2>
          <p>Discover our teams and explore career opportunities</p>
          <button className='btn btn-ghost'>Find your role</button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
