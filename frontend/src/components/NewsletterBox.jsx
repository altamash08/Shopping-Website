import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <section className='my-16 sm:my-24'>
      <div className='holo rounded-[36px] p-[1.5px]'>
        <div className='rounded-[35px] bg-ink px-6 py-14 text-center text-white sm:px-14 sm:py-20'>
          <h2 className='mx-auto max-w-2xl text-balance font-display font-light leading-[1.15] tracking-[-0.03em] text-[length:clamp(1.5rem,3.4vw,2.6rem)]'>
            Subscribe now & get 20% off
          </h2>
          <p className='mx-auto mt-4 max-w-md text-white/65'>
            Stay stylish! Subscribe for new arrivals & exclusive offers.
          </p>
          <form onSubmit={onSubmitHandler} className='pill-field mx-auto mt-9 max-w-lg border border-white/15 bg-white/10 p-1.5 pl-5'>
            <input
              className='bare-input min-w-0 flex-1 text-sm placeholder:text-white/45'
              type='email'
              placeholder='Enter your email'
              aria-label='Email address'
              autoComplete='email'
              required
            />
            <button type='submit' className='btn btn-light h-11'>Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewsletterBox
