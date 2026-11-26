import React from 'react'

// Inline SVG icons: crisp at any size and they follow the surrounding text colour
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const SearchIcon = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
)
export const BagIcon = (p) => (
  <svg {...base} {...p}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
)
export const UserIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></svg>
)
export const MenuIcon = (p) => (
  <svg {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>
)
export const CloseIcon = (p) => (
  <svg {...base} {...p}><path d="m6 6 12 12M18 6 6 18" /></svg>
)
export const ChevronIcon = (p) => (
  <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
)
export const TrashIcon = (p) => (
  <svg {...base} {...p}><path d="M5 7h14" /><path d="M10 7V5h4v2" /><path d="m7 7 1 13h8l1-13" /><path d="M10 11v5M14 11v5" /></svg>
)
export const PlusIcon = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
)
export const MinusIcon = (p) => (
  <svg {...base} {...p}><path d="M5 12h14" /></svg>
)
export const CheckIcon = (p) => (
  <svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
)
export const StarIcon = ({ filled = true, ...p }) => (
  <svg {...base} strokeWidth={1.4} fill={filled ? 'currentColor' : 'none'} {...p}>
    <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.7l5.8-.8L12 3.6Z" />
  </svg>
)
export const ExchangeIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 10a7 7 0 0 1 12-3.5L19 9" /><path d="M19 4.5V9h-4.5" />
    <path d="M19.5 14a7 7 0 0 1-12 3.5L5 15" /><path d="M5 19.5V15h4.5" />
  </svg>
)
export const ShieldIcon = (p) => (
  <svg {...base} {...p}><path d="M12 3 5 6v5.2c0 4.4 3 7.9 7 9.8 4-1.9 7-5.4 7-9.8V6l-7-3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></svg>
)
export const HeadsetIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13.5" width="4.5" height="6" rx="2" />
    <rect x="16.5" y="13.5" width="4.5" height="6" rx="2" />
    <path d="M19 19.5c0 1.2-1.6 2-4 2h-2" />
  </svg>
)
export const ScanIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
    <path d="M4 12h16" />
  </svg>
)
