'use client'
import { useEffect } from 'react'
import { initLenis } from '@/lib/initLenis'// adjust path as needed

const PageWrapper = ({ childrenn }) => {
  useEffect(() => {
    const lenis = initLenis()

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{childrenn}</>
}

export default PageWrapper
