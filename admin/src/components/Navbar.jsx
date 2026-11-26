import React from 'react'
import Logo from './Logo'
import { LogoutIcon } from './Icons'

const Navbar = ({ setToken }) => {
  return (
    <header className='sticky top-3 z-40 pt-3'>
      <div className='glass flex h-14 items-center justify-between gap-4 rounded-full pl-5 pr-2'>
        <div className='flex items-center gap-3'>
          <Logo />
          <span className='rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-semibold text-white'>Admin</span>
        </div>
        <button onClick={() => setToken('')} className='btn btn-ghost h-10 px-5'>
          <LogoutIcon className='h-4 w-4' />Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
