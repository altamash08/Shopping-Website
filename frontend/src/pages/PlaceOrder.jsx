import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, setToken, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    // The token is restored from localStorage a moment after first render, so check both
    const signedIn = !!token || !!localStorage.getItem('token');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    useEffect(() => {
        if (!signedIn) {
            toast.info('Please sign in to place your order')
            navigate('/login', { state: { from: '/place-order' } })
        }
    }, [])

    // One place to report a failed request. An expired or missing token sends the user back to sign in.
    const fail = (message) => {
        if (/not authorized|jwt|invalid token|token/i.test(message || '')) {
            localStorage.removeItem('token')
            setToken('')
            toast.error('Your session has expired. Please sign in again.')
            navigate('/login', { state: { from: '/place-order' } })
        } else {
            toast.error(message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {

                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            if (orderItems.length === 0) {
                toast.error('Your cart is empty')
                return
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }


            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        fail(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        fail(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    } else {
                        fail(responseRazorpay.data.message)
                    }

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const paymentOptions = [
        { id: 'stripe', content: <img className='h-5' src={assets.stripe_logo} alt='Stripe' /> },
        { id: 'razorpay', content: <img className='h-5' src={assets.razorpay_logo} alt='Razorpay' /> },
        { id: 'cod', content: <span className='text-sm font-semibold'>Cash on delivery</span> },
    ]

    if (!signedIn) return null

    return (
        <form onSubmit={onSubmitHandler} className='grid gap-10 pb-6 pt-10 sm:pt-14 lg:grid-cols-[1fr_26rem] lg:gap-14'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4'>

                <Title text1={'DELIVERY'} text2={'INFORMATION'} as='h1' className='mb-4' />
                <div className='grid gap-4 sm:grid-cols-2'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} autoComplete='given-name' aria-label='First name' className='field' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} autoComplete='family-name' aria-label='Last name' className='field' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} autoComplete='email' aria-label='Email address' className='field' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} autoComplete='street-address' aria-label='Street' className='field' type="text" placeholder='Street' />
                <div className='grid gap-4 sm:grid-cols-2'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} autoComplete='address-level2' aria-label='City' className='field' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} autoComplete='address-level1' aria-label='State' className='field' type="text" placeholder='State' />
                </div>
                <div className='grid gap-4 sm:grid-cols-2'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} autoComplete='postal-code' aria-label='Zipcode' className='field' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} autoComplete='country-name' aria-label='Country' className='field' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} autoComplete='tel' aria-label='Phone' className='field' type="number" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='self-start lg:sticky lg:top-24'>
                <div className='glass rounded-[28px] p-6 sm:p-8'>
                    <CartTotal />

                    <div className='mt-8 border-t border-hair pt-8'>
                        <Title text1={'PAYMENT'} text2={'METHOD'} className='text-[length:1.4rem]' />
                        {/* --------------- Payment Method Selection ------------- */}
                        <div role='radiogroup' aria-label='Payment method' className='mt-5 flex flex-col gap-3'>
                            {paymentOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    type='button'
                                    role='radio'
                                    aria-checked={method === opt.id}
                                    onClick={() => setMethod(opt.id)}
                                    className={`flex h-14 items-center gap-4 rounded-2xl border px-4 text-left transition-colors ${method === opt.id ? 'border-ink bg-white' : 'border-hair bg-white/50 hover:bg-white/80'}`}
                                >
                                    <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${method === opt.id ? 'border-ink' : 'border-steel/50'}`}>
                                        {method === opt.id && <span className='h-2 w-2 rounded-full bg-ink' />}
                                    </span>
                                    {opt.content}
                                </button>
                            ))}
                        </div>

                        <button type='submit' className='btn btn-primary mt-8 w-full'>Place order</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
