import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';
import { SearchIcon, CloseIcon } from './Icons'

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    }, [location])

  return showSearch && visible ? (
    <div className='mt-3'>
      <div className='glass pill-field h-14 pl-5 pr-2'>
        <SearchIcon className='shrink-0 text-steel' />
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bare-input flex-1 text-sm placeholder:text-steel/70'
          type='text'
          placeholder='Search products'
          aria-label='Search products'
        />
        <button onClick={() => setShowSearch(false)} aria-label='Close search' className='icon-btn'>
          <CloseIcon className='h-[18px] w-[18px]' />
        </button>
      </div>
    </div>
  ) : null
}

export default SearchBar
