import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { ImagePlusIcon } from '../components/Icons'

const allSizes = ['S', 'M', 'L', 'XL', 'XXL']

const Add = ({token}) => {

  const [images, setImages] = useState([false, false, false, false])

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("Men");
   const [subCategory, setSubCategory] = useState("Topwear");
   const [bestseller, setBestseller] = useState(false);
   const [sizes, setSizes] = useState([]);

   const setImage = (index, file) => setImages(prev => prev.map((img, i) => i === index ? (file || false) : img))

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      images.forEach((img, i) => img && formData.append(`image${i + 1}`, img))

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImages([false, false, false, false])
        setPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }

  return (
    <form onSubmit={onSubmitHandler} className='flex max-w-3xl flex-col gap-8'>
        <h1 className='font-display text-[length:clamp(1.6rem,3vw,2.2rem)] font-light leading-tight tracking-[-0.03em]'>Add product</h1>

        <section>
          <p className='mb-3 text-sm font-semibold'>Images</p>
          <div className='grid grid-cols-4 gap-3 sm:max-w-md'>
            {images.map((img, i) => (
              <label key={i} htmlFor={`image${i + 1}`} className='tile flex aspect-[4/5] cursor-pointer items-center justify-center rounded-2xl border border-dashed border-steel/40 transition-colors hover:border-ink'>
                {img
                  ? <img src={URL.createObjectURL(img)} alt={`Selected image ${i + 1}`} className='absolute inset-0 h-full w-full object-cover' />
                  : <ImagePlusIcon className='text-steel' />}
                <input onChange={(e)=>setImage(i, e.target.files[0])} type="file" accept='image/*' id={`image${i + 1}`} className='sr-only' />
              </label>
            ))}
          </div>
        </section>

        <div className='flex flex-col gap-2'>
          <label htmlFor='p-name' className='text-sm font-semibold'>Product name</label>
          <input id='p-name' onChange={(e)=>setName(e.target.value)} value={name} className='field' type="text" placeholder='Type here' required/>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='p-desc' className='text-sm font-semibold'>Product description</label>
          <textarea id='p-desc' onChange={(e)=>setDescription(e.target.value)} value={description} className='field h-auto min-h-[140px] py-3' placeholder='Write content here' required/>
        </div>

        <div className='grid gap-6 sm:grid-cols-3'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='p-cat' className='text-sm font-semibold'>Category</label>
              <select id='p-cat' value={category} onChange={(e) => setCategory(e.target.value)} className='select w-full'>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='p-sub' className='text-sm font-semibold'>Sub category</label>
              <select id='p-sub' value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='select w-full'>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='p-price' className='text-sm font-semibold'>Price</label>
              <input id='p-price' onChange={(e) => setPrice(e.target.value)} value={price} className='field' type="number" placeholder='25' />
            </div>
        </div>

        <section>
          <p className='mb-3 text-sm font-semibold'>Sizes</p>
          <div className='flex flex-wrap gap-2' role='group' aria-label='Sizes'>
            {allSizes.map((s) => (
              <button
                key={s}
                type='button'
                aria-pressed={sizes.includes(s)}
                data-on={sizes.includes(s)}
                onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s])}
                className='chip min-w-[3rem] justify-center'
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <label htmlFor='bestseller' className='flex w-fit cursor-pointer items-center gap-3 text-sm font-medium'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='h-5 w-5 cursor-pointer accent-[#171B2E]' />
          Add to bestseller
        </label>

        <button type="submit" className='btn btn-primary w-full sm:w-48'>Add product</button>

    </form>
  )
}

export default Add
