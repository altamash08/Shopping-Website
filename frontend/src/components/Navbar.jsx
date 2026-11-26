import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Logo from './Logo'
import { SearchIcon, BagIcon, UserIcon, MenuIcon, CloseIcon } from './Icons'

const links = [
  { to: '/', label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const cartCount = getCartCount()

  return (
    <header className='sticky top-3 z-40 pt-3'>
      <div className='glass flex h-14 items-center justify-between gap-4 rounded-full pl-5 pr-2'>

        <Link to='/' aria-label='JustBuyy, go to home'><Logo /></Link>

        {/* Desktop links */}
        <nav aria-label='Main' className='hidden items-center gap-1 rounded-full border border-white/80 bg-white/50 p-1 md:flex'>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-300 ${isActive ? 'bg-ink text-white' : 'text-steel hover:text-ink'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className='flex items-center gap-1'>
          <button aria-label='Search products' onClick={() => { setShowSearch(true); navigate('/collection') }} className='icon-btn'>
            <SearchIcon />
          </button>

          <div className='group relative'>
            <button aria-label={token ? 'Account menu' : 'Sign in'} onClick={() => token ? null : navigate('/login')} className='icon-btn'>
              <UserIcon />
            </button>
            {/* Dropdown menu */}
            {token &&
            <div className='invisible absolute right-0 top-full pt-3 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100'>
              <div className='glass flex w-44 flex-col gap-1 rounded-2xl p-2 text-sm font-medium'>
                <p className='cursor-pointer rounded-xl px-3 py-2 text-steel hover:bg-white/80 hover:text-ink'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer rounded-xl px-3 py-2 text-steel hover:bg-white/80 hover:text-ink'>Orders</p>
                <p onClick={logout} className='cursor-pointer rounded-xl px-3 py-2 text-steel hover:bg-white/80 hover:text-ink'>Logout</p>
              </div>
            </div>}
          </div>

          <Link to='/cart' aria-label={`Cart, ${cartCount} items`} className='icon-btn'>
            <BagIcon />
            {cartCount > 0 &&
              <span className='absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold leading-none text-white'>{cartCount}</span>}
          </Link>

          <button aria-label='Open menu' onClick={() => setVisible(true)} className='icon-btn md:hidden'>
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Full-screen menu for small screens */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!visible}
      >
        <div className='absolute inset-0 bg-pearl/95 backdrop-blur-xl' onClick={() => setVisible(false)} />
        <div className='relative flex h-full flex-col px-6 pt-6'>
          <div className='flex h-14 items-center justify-between'>
            <Logo />
            <button aria-label='Close menu' onClick={() => setVisible(false)} className='icon-btn'><CloseIcon /></button>
          </div>
          <nav aria-label='Mobile' className='mt-12 flex flex-col gap-1'>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setVisible(false)}
                tabIndex={visible ? 0 : -1}
                className={({ isActive }) =>
                  `border-b border-hair py-4 font-display text-[length:1.9rem] font-light tracking-[-0.03em] ${isActive ? 'text-ink' : 'text-steel'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className='mt-8 flex gap-3'>
            {token
              ? <>
                  <button tabIndex={visible ? 0 : -1} onClick={() => { setVisible(false); navigate('/orders') }} className='btn btn-ghost'>Orders</button>
                  <button tabIndex={visible ? 0 : -1} onClick={() => { setVisible(false); logout() }} className='btn btn-ghost'>Logout</button>
                </>
              : <button tabIndex={visible ? 0 : -1} onClick={() => { setVisible(false); navigate('/login') }} className='btn btn-primary'>Sign in</button>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
