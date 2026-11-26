import React from 'react'
import { ExchangeIcon, ShieldIcon, HeadsetIcon } from './Icons'

const policies = [
  { Icon: ExchangeIcon, title: 'Easy Exchange Policy', text: 'Hassle-free exchanges for a smooth shopping experience' },
  { Icon: ShieldIcon, title: '7 Days Return Policy', text: 'Shop with confidence, 7 days free return policy.' },
  { Icon: HeadsetIcon, title: 'Best customer support', text: '24/7 support, we’re always here for you.' },
]

const OurPolicy = () => {
  return (
    <section className='py-12 sm:py-16'>
      <div className='glass grid divide-y divide-hair rounded-[28px] md:grid-cols-3 md:divide-x md:divide-y-0'>
        {policies.map(({ Icon, title, text }) => (
          <div key={title} className='flex items-start gap-4 p-6 sm:p-8'>
            <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hair bg-white/80'>
              <Icon />
            </span>
            <div>
              <p className='font-semibold'>{title}</p>
              <p className='mt-1 text-sm text-steel'>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
