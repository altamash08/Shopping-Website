import React from 'react'
import { NavLink } from 'react-router-dom'
import { PlusIcon, ListIcon, PackageIcon } from './Icons'

const items = [
  { to: '/add', label: 'Add items', Icon: PlusIcon },
  { to: '/list', label: 'List items', Icon: ListIcon },
  { to: '/orders', label: 'Orders', Icon: PackageIcon },
]

const Sidebar = () => {
  return (
    <aside className='lg:w-60 lg:shrink-0'>
      <nav aria-label='Admin' className='glass flex gap-1 overflow-x-auto rounded-full p-1.5 lg:sticky lg:top-24 lg:flex-col lg:rounded-[26px] lg:p-2'>
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-2.5 lg:gap-3 lg:px-4 text-sm font-semibold transition-colors duration-300 lg:flex-none lg:justify-start ${isActive ? 'bg-ink text-white' : 'text-steel hover:bg-white/70 hover:text-ink'}`
            }
          >
            <Icon className='h-[18px] w-[18px] shrink-0' />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
