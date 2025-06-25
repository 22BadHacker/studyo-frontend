'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppHook } from '@/context/AppProvider'
import { useState } from 'react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/Explore' },
  { label: 'Artists', href: '/Artists' },
  { label: 'Library', href: '/Library' },
]

export default function Bottom() {
  const pathname = usePathname()
  const { authToken } = useAppHook()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleLibraryClick = (e, href) => {
    if (!authToken && href === '/Library') {
      e.preventDefault()
      setShowLoginModal(true)
    }
  }

  return (
    <>

    <div className="w-fit z-[20] fixed bottom-7 left-1/2 -translate-x-1/2">
        <div className="bg-gradient-to-tr  from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 bottom-nav tracking-wider font-semibold font-NeueMontreal  text-white border-white/10 gap-[2px] scale-95 border-[1px]  flex-center  relative flex items-center rounded-full p-[4px] w-fit">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleLibraryClick(e, item.href)}
                className={`relative  text-[15.8px] z-10 px-6 py-[13px] flex-center rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-white  text-black' : 'hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
    </div>

      {/* Login Modal */}
      {showLoginModal && (
          <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-xs flex items-center justify-center z-[9999]">
            <div className="bg-[#121212] p-6 rounded-lg max-w-md w-full border border-white/10">
              <h2 className="text-xl font-bold mb-3">Login Required</h2>
              <p className="mb-8 text-white/80">You need to be logged in to access your library.</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 font-NeueMontreal text-[15px] py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <Link
                  href="/Auth/Login" // Adjust this to your login route
                  className="px-4 py-2 font-NeueMontreal text-[15px] rounded-full bg-white text-black hover:bg-white/90 transition font-medium"
                  onClick={() => setShowLoginModal(false)}
                >
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        
      )}
    </>
  )
}


// bg-[#d8dfe8]/20 