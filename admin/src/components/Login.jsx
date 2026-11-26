
import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import Logo from './Logo'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const API_URL = (
        backendUrl || 'https://shopping-website-backend-u3u1.onrender.com'
    ).replace(/\/+$/, '')

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (loading) return

        try {
            setLoading(true)

            const response = await axios.post(
                `${API_URL}/api/user/admin`,
                {
                    email: email.trim(),
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                }
            )

            if (response.data.success && response.data.token) {
                setToken(response.data.token)
                toast.success('Login successful!')
            } else {
                toast.error(response.data.message || 'Invalid email or password')
            }

        } catch (error) {
            console.error('Admin Login Error:', error)

            if (error.response) {
                toast.error(
                    error.response.data?.message ||
                    `Server Error: ${error.response.status}`
                )
            } else if (error.code === 'ECONNABORTED') {
                toast.error('Server timeout. Please try again.')
            } else {
                toast.error('Unable to connect to backend server.')
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center py-10'>
            <div className='holo w-full max-w-md rounded-[34px] p-[2px] shadow-float'>

                <form
                    onSubmit={onSubmitHandler}
                    className='flex flex-col gap-4 rounded-[32px] bg-mist p-7 sm:p-10'
                >

                    <Logo className='text-[length:1.5rem]' />

                    <h1 className='mt-6 font-display text-[length:clamp(1.6rem,4vw,2rem)] font-light leading-tight tracking-[-0.03em]'>
                        Admin sign in
                    </h1>

                    <p className='-mt-2 mb-2 text-sm text-steel'>
                        Manage products and orders.
                    </p>

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className='field'
                        type="email"
                        placeholder='Email address'
                        aria-label='Email address'
                        autoComplete='email'
                        required
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='field'
                        type="password"
                        placeholder='Password'
                        aria-label='Password'
                        autoComplete='current-password'
                        required
                    />

                    <button
                        className='btn btn-primary mt-3 w-full'
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Login
