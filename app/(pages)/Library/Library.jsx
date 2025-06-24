'use client'
import React, { useEffect, useState } from 'react'
import { useAppHook } from '@/context/AppProvider'
import { useRouter } from 'next/navigation';
// import 

const Library = () => {
    const {authToken} = useAppHook()
    const router = useRouter()

    // useEffect(() => {
    //     if (!authToken) return router.push('/Auth/Login');
    // })

  return (
    <>
         <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] '>Your Library</h1>
    </>
  )
}

export default Library
