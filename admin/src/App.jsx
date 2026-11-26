import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹"

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='mx-auto min-h-screen w-full max-w-[1280px] px-4 sm:px-8'>
      <ToastContainer position='bottom-right' />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <div className='mt-6 flex flex-col gap-6 pb-16 lg:flex-row lg:gap-10'>
            <Sidebar />
            <main className='min-w-0 flex-1'>
              <Routes>
                <Route path='/' element={<Navigate to='/list' replace />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </main>
          </div>
        </>
      }
    </div>
  )
}

export default App
