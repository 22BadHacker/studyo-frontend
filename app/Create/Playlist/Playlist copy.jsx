'use client'
import { useAppHook } from '@/context/AppProvider';
import Link from 'next/link'
import React, { useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'

const Playlist = () => {
  const [coverImage, setCoverImage] = useState(null);
    const [previewImage, setPreviewImage] = useStatee(null);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const { authToken } = useAppHook();
  return (
    <div className='flex max-w-[800px]  py-5 pt-10 flex-col gap-9'>
      <Link href={'/'} className='size-12 mb-1 relative top-5  flex-center text-white bg-main2 rounded-full text-[23px]'><GoChevronLeft/></Link>
      <div className="flex leading-snug flex-col gap-1">
        <p className="text-white/95 font-semibold tracking-wide font-NeueMontreal text-[15px]">Create Playlist</p>
        <h2 className="text-[37px] leading-[1.1] text-white font-NeueMontreal font-semibold">Your vibe, your playlist – mix the sounds that define you!</h2>
      </div>
    </div>
  )
}

export default Playlist
