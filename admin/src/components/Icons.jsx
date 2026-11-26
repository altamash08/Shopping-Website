import React from 'react'

const base = {
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
}

export const PlusIcon = (p) => <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
export const ListIcon = (p) => <svg {...base} {...p}><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r=".8" /><circle cx="4.5" cy="12" r=".8" /><circle cx="4.5" cy="18" r=".8" /></svg>
export const PackageIcon = (p) => <svg {...base} {...p}><path d="m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3Z" /><path d="m4 7.2 8 4.3 8-4.3M12 11.5V21" /></svg>
export const TrashIcon = (p) => <svg {...base} {...p}><path d="M5 7h14" /><path d="M10 7V5h4v2" /><path d="m7 7 1 13h8l1-13" /><path d="M10 11v5M14 11v5" /></svg>
export const ImagePlusIcon = (p) => <svg {...base} {...p}><rect x="3.5" y="4.5" width="14" height="14" rx="2.5" /><path d="m3.5 15 4-4 4 4 2-2 4 4" /><path d="M19.5 3v5M17 5.5h5" /></svg>
export const LogoutIcon = (p) => <svg {...base} {...p}><path d="M10 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H10" /><path d="M15 8l4 4-4 4M19 12H9" /></svg>
