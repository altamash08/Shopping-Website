import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between bg-white shadow-md">
      {/* Logo that blends with white background */}
      <img 
        className="w-[max(10%,80px)] mix-blend-multiply" 
        src={assets.logo} 
        alt="logo" 
      />

      <button 
        onClick={() => setToken('')} 
        className="bg-gray-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
