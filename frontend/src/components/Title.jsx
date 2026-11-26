import React from 'react'

// Keeps the old text1/text2 API, but renders one calm sentence-case heading
const sentence = (s) => {
  const t = s.trim().toLowerCase()
  return t.charAt(0).toUpperCase() + t.slice(1)
}

// Pass a className with its own text-[...] size to override the default size
const Title = ({ text1, text2 = '', as: Tag = 'h2', className = '' }) => {
  const size = /text-\[/.test(className) ? '' : 'text-[length:clamp(1.6rem,3.4vw,2.6rem)]'
  return (
    <Tag className={`font-display font-light leading-[1.1] tracking-[-0.03em] ${size} ${className}`}>
      {sentence(`${text1} ${text2}`)}
    </Tag>
  )
}

export default Title
