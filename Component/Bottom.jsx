'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/Search' },
  { label: 'Artists', href: '/Artists' },
  { label: 'Library', href: '/library' },
]

export default function Bottom() {
  const pathname = usePathname()

  return (
    <div
      className="bg-gradient-to-tr  from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 bottom-nav tracking-wider font-semibold font-NeueMontreal  text-white border-white/10 gap-[2px] scale-95 border-[1px]  flex-center  relative flex items-center rounded-full p-[4px] w-fit"
    >
      
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative  text-[15.8px] z-10 px-6 py-[12.5px] flex-center rounded-full transition-colors duration-300 ${
              isActive ? 'bg-white  text-black' : 'hover:bg-white/10'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}


// bg-[#d8dfe8]/20 