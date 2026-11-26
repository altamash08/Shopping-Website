import React from 'react'

// Text wordmark: "Just" light + "Buyy" bold. The original raster logo is still in assets (assets.logo).
const Logo = ({ className = '' }) => (
  <span className={`font-logo text-[length:1.2rem] leading-none tracking-[-0.02em] text-ink ${className}`}>
    <span className='font-light'>Just</span><span className='font-bold'>Buyy</span>
  </span>
)

export default Logo
