import React from 'react'

// Same wordmark as the storefront: "Just" light + "Buyy" bold
const Logo = ({ className = '' }) => (
  <span className={`font-logo text-[length:1.2rem] leading-none tracking-[-0.02em] text-ink ${className}`}>
    <span className='font-light'>Just</span><span className='font-bold'>Buyy</span>
  </span>
)

export default Logo
