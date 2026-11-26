import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import Logo from './Logo'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='flex min-h-screen items-center justify-center py-10'>
        <div className='holo w-full max-w-md rounded-[34px] p-[2px] shadow-float'>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 rounded-[32px] bg-mist p-7 sm:p-10'>
                <Logo className='text-[length:1.5rem]' />
                <h1 className='mt-6 font-display text-[length:clamp(1.6rem,4vw,2rem)] font-light leading-tight tracking-[-0.03em]'>Admin sign in</h1>
                <p className='-mt-2 mb-2 text-sm text-steel'>Manage products and orders.</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='field' type="email" placeholder='Email address' aria-label='Email address' autoComplete='email' required />
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='field' type="password" placeholder='Password' aria-label='Password' autoComplete='current-password' required />
                <button className='btn btn-primary mt-3 w-full' type="submit">Sign in</button>
            </form>
        </div>
    </div>
  )
}

export default Login
