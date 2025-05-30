'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/Search' },
  { label: 'Artists', href: '/Artists' },
  { label: 'Library', href: '/library' },
]

export default function NavBar() {
  const pathname = usePathname()
  const containerRef = useRef(null)
  const itemRefs = useRef([])

  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
  })

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.href === pathname)
    const activeItem = itemRefs.current[activeIndex]

    if (activeItem && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()

      setHighlightStyle({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
      })
    }
  }, [pathname])

  return (
    <div
      ref={containerRef}
      className="bg-[#d8dfe8]/20 border-white/10 scale-95  border-[1px]    gap-0 flex-center  backdrop-blur-[25px] relative flex items-center  rounded-full px-[4px] py-[8px] w-fit"
    >
      <motion.div
        layout
        className="absolute   h-[47.5px] bg-white rounded-full z-0"
        animate={highlightStyle}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
      {navItems.map((item, idx) => (
        <Link
          key={item.href}
          href={item.href}
          ref={el => (itemRefs.current[idx] = el)}
          className="relative text-[15.8px] z-10 px-[26px] py-2 tracking-wide font-semibold mix-blend-difference font-SpaceGrotesk text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}


