import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl, mergeGuestCart } = useContext(ShopContext)
  const location = useLocation()
  // Set when a guest was sent here from checkout
  const redirectTo = location.state?.from || '/'

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {

          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            await mergeGuestCart(response.data.token)
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            await mergeGuestCart(response.data.token)
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate(redirectTo)
    }
  },[token])

  const isLogin = currentState === 'Login'

  return (
    <div className='flex justify-center px-0 pb-10 pt-12 sm:pt-20'>
      <form onSubmit={onSubmitHandler} className='glass flex w-full max-w-md flex-col gap-4 rounded-[32px] p-7 sm:p-10'>
          <h1 className='font-display text-[length:clamp(1.7rem,4vw,2.2rem)] font-light leading-tight tracking-[-0.03em]'>
            {isLogin ? 'Sign in' : 'Create account'}
          </h1>
          <p className='-mt-2 mb-3 text-sm text-steel'>
            {location.state?.from ? 'Sign in to continue to checkout. Your cart will be kept.' : isLogin ? 'Welcome back. Sign in to see your cart and orders.' : 'It takes a minute. Save your cart and track your orders.'}
          </p>
          {isLogin ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='field' placeholder='Name' aria-label='Name' autoComplete='name' required/>}
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='field' placeholder='Email' aria-label='Email' autoComplete='email' required/>
          <input onChange={(e)=>setPasword(e.target.value)} value={password} type="password" className='field' placeholder='Password' aria-label='Password' autoComplete={isLogin ? 'current-password' : 'new-password'} required/>
          <div className='flex justify-between text-sm text-steel'>
              <p className='cursor-pointer hover:text-ink'>Forgot your password?</p>
          </div>
          <button className='btn btn-primary mt-2 w-full'>{isLogin ? 'Sign in' : 'Create account'}</button>
          <p className='mt-2 text-center text-sm text-steel'>
            {isLogin
              ? <>New here? <button type='button' onClick={()=>setCurrentState('Sign Up')} className='font-semibold text-ink underline decoration-hair decoration-2 underline-offset-4 hover:decoration-ink'>Create account</button></>
              : <>Already have an account? <button type='button' onClick={()=>setCurrentState('Login')} className='font-semibold text-ink underline decoration-hair decoration-2 underline-offset-4 hover:decoration-ink'>Sign in</button></>}
          </p>
      </form>
    </div>
  )
}

export default Login
