import React from 'react'
import { IoMdClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

const Settiings = ({close}) => {
  return (
    <div className='w-[530px] px-1 py-2 shadow-2xl  gap-3 relative h-[500px] rounded-2xl bg-[#121212]'>
        <button onClick={close} className='absolute  cursor-pointer top-4 right-4 font-semibold text-red-500'>close</button>
        
        <div className="flex w-full flex-col  py-1">
            <h1 className='text-2xl px-4 pb-7 font-semibold'>Settings</h1>
            <div className="py-[10px] px-4 hover:text-white  font-NeueMontreal font-medium text-[15px] text-white/80 flex items-center justify-between w-full  ">Edit Your Profile <LuSquareArrowOutUpRight/></div>
            <div className="py-[10px] px-4 hover:text-white  font-NeueMontreal font-medium text-[15px] text-white/80 flex items-center justify-between w-full  ">Delete Your Account <button className='text-white px-4 py-1 rounded-full bg-red-500'>Delete</button></div>
        </div>

    </div>
  )
}

export default Settiings
