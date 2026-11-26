import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { ChevronIcon } from '../components/Icons';

const categoryOptions = ['Men', 'Women', 'Kids']
const typeOptions = ['Topwear', 'Bottomwear', 'Winterwear']

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const location = useLocation();
  // Links from the home page (hero tags, category tiles) can pre-select filters
  const incoming = location.state || {};

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState(incoming.category ? [incoming.category] : []);
  const [subCategory, setSubCategory] = useState(incoming.subCategory ? [incoming.subCategory] : []);
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  }

  // Filter and sort together, so changing a filter keeps the chosen sort order
  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    if (sortType === 'low-high') {
      productsCopy.sort((a, b) => (a.price - b.price));
    } else if (sortType === 'high-low') {
      productsCopy.sort((a, b) => (b.price - a.price));
    }

    setFilterProducts(productsCopy)

  }

  useEffect(() => {
      applyFilter();
  }, [category, subCategory, search, showSearch, products, sortType])

  const activeCount = category.length + subCategory.length

  return (
    <div className='flex flex-col gap-6 pb-10 pt-10 sm:pt-14 lg:flex-row lg:gap-12'>

      {/* Filter Options */}
      <aside className='lg:w-64 lg:shrink-0'>
        <div className='lg:sticky lg:top-24'>
          <button
            onClick={() => setShowFilter(!showFilter)}
            aria-expanded={showFilter}
            className='btn btn-ghost w-full justify-between lg:hidden'
          >
            <span>Filters{activeCount > 0 ? ` (${activeCount})` : ''}</span>
            <ChevronIcon className={`h-4 w-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
          </button>

          <div className={`glass mt-3 flex-col gap-7 rounded-[26px] p-6 lg:mt-0 lg:flex ${showFilter ? 'flex' : 'hidden'}`}>
            <p className='hidden font-display text-[length:1.1rem] font-light tracking-tight lg:block'>Filters</p>

            {/* Category Filter */}
            <fieldset>
              <legend className='mb-3 text-sm font-semibold'>Categories</legend>
              <div className='flex flex-wrap gap-2'>
                {categoryOptions.map((c) => (
                  <label key={c}>
                    <input className='peer sr-only' type='checkbox' value={c} checked={category.includes(c)} onChange={toggleCategory} />
                    <span className='chip'>{c}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* SubCategory Filter */}
            <fieldset>
              <legend className='mb-3 text-sm font-semibold'>Type</legend>
              <div className='flex flex-wrap gap-2'>
                {typeOptions.map((t) => (
                  <label key={t}>
                    <input className='peer sr-only' type='checkbox' value={t} checked={subCategory.includes(t)} onChange={toggleSubCategory} />
                    <span className='chip'>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {activeCount > 0 &&
              <button onClick={clearFilters} className='self-start text-sm font-semibold underline decoration-hair decoration-2 underline-offset-8 hover:decoration-ink'>
                Clear filters
              </button>}
          </div>
        </div>
      </aside>

      {/* Right Side */}
      <div className='min-w-0 flex-1'>

        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div>
            <Title text1={'ALL'} text2={'COLLECTIONS'} as='h1' />
            <p className='mt-2 text-sm text-steel'>{filterProducts.length} {filterProducts.length === 1 ? 'item' : 'items'}</p>
          </div>
          {/* Porduct Sort */}
          <select value={sortType} onChange={(e) => setSortType(e.target.value)} aria-label='Sort products' className='select'>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        {filterProducts.length > 0
          ? <div className='mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4'>
              {
                filterProducts.map((item, index) => (
                  <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                ))
              }
            </div>
          : <div className='mt-8 rounded-[26px] border border-dashed border-hair px-6 py-16 text-center'>
              <p className='font-display text-[length:1.2rem] font-light tracking-tight'>No products found</p>
              <p className='mt-2 text-sm text-steel'>Try removing a filter or changing your search.</p>
              {activeCount > 0 && <button onClick={clearFilters} className='btn btn-ghost mt-6'>Clear filters</button>}
            </div>}
      </div>

    </div>
  )
}

export default Collection
