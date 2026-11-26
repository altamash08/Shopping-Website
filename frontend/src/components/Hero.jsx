import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { CheckIcon, ScanIcon } from './Icons'

// Tags sit on the garments in the photo. x / y are % of the square lens.
// "side" is where the label opens from the dot. Each tag opens a filtered collection.
const tags = [
  { label: "Women's tops", x: 49, y: 66, side: 'left', filter: { category: 'Women', subCategory: 'Topwear' } },
  { label: "Women's bottoms", x: 58, y: 87, side: 'left', filter: { category: 'Women', subCategory: 'Bottomwear' } },
]

const perks = ['Easy exchange', '7-day returns', 'Cash on delivery']

const Hero = () => {

  const lensRef = useRef(null)

  // The holographic edge turns to follow the pointer
  const onPointerMove = (e) => {
    const el = lensRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.setProperty('--ang', `${(Math.atan2(dy, dx) * 180) / Math.PI + 90}deg`)
  }

  return (
    <section className='grid items-center gap-12 pb-6 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20'>

      {/* Left: headline + actions */}
      <div className='lg:col-span-6'>
        <h1 className='font-display font-light leading-[1.02] tracking-[-0.045em] text-[length:clamp(2.6rem,5.8vw,5rem)]'>
          Latest<br />arrivals
        </h1>
        <p className='mt-6 max-w-md text-base text-steel sm:text-lg'>
          Fresh styles for men, women and kids, made for everyday wear.
        </p>
        <div className='mt-9 flex flex-wrap gap-3'>
          <Link to='/collection' className='btn btn-primary'>Shop the collection</Link>
          <a href='#best-sellers' className='btn btn-ghost'>See best sellers</a>
        </div>
        <ul className='mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-steel'>
          {perks.map((p) => (
            <li key={p} className='flex items-center gap-2'>
              <CheckIcon className='h-4 w-4 text-ink' />{p}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: the lens */}
      <div
        ref={lensRef}
        onPointerMove={onPointerMove}
        className='holo rounded-[34px] p-[2px] shadow-float lg:col-span-6'
      >
        <div className='relative aspect-square overflow-hidden rounded-[32px] bg-mist'>
          <img
            src={assets.hero_img}
            alt='A woman in a cream blouse and olive wool skirt holding a bunch of dried flowers on an old stairway'
            className='lens-photo absolute inset-0 h-full w-full object-cover'
            style={{ objectPosition: '56% 50%' }}
            decoding='async'
          />
          <span className='scan' aria-hidden='true' />
          <span className='hud' aria-hidden='true' />

          <span className='glass absolute left-5 top-5 flex items-center gap-2 rounded-full py-1.5 pl-3 pr-4 text-xs font-semibold'>
            <ScanIcon className='h-4 w-4' />Shop the look
          </span>

          {tags.map((t) => (
            <Link
              key={t.label}
              to='/collection'
              state={t.filter}
              style={t.side === 'left' ? { right: `${100 - t.x}%`, top: `${t.y}%` } : { left: `${t.x}%`, top: `${t.y}%` }}
              className={`group absolute flex -translate-y-1/2 items-center ${t.side === 'left' ? 'translate-x-[9px] flex-row-reverse' : '-translate-x-[9px] flex-row'}`}
            >
              <span className='relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-white/30 shadow-[0_0_0_1px_rgba(23,27,46,0.25)] backdrop-blur-sm'>
                <span className='h-1.5 w-1.5 rounded-full bg-white' />
              </span>
              <span className={`h-px w-5 bg-white shadow-[0_0_0_0.5px_rgba(23,27,46,0.25)] sm:w-8`} />
              <span className='glass whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 group-hover:bg-white sm:text-[13px]'>
                {t.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
