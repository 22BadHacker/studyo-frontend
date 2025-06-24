import React from 'react'
import { IoMdClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const Settiings = ({close}) => {
  return (
    <div className='w-[630px] border-[.5px] overflow-hidden shadow-2xl grid grid-cols-[auto_1fr] gap-3 relative h-[500px] rounded-2xl bg-[#fff]'>
        <button onClick={close} className='absolute cursor-pointer top-3 left-3 text-main2 hover:text-red-500'><IoMdClose size={24}/></button>
        <div className="w-[170px] px-1  pt-12 flex flex-col gap-1 border-r-[.5px]  h-full bg-[#f9f9f9]">
            <div className="flex rounded-md duration-200 font-normal  ease-in-out cursor-pointer text-[15px] w-full text-main2/85 hover:bg-[#efefef] p-2 font items-center gap-[6px]">
              <IoSettingsOutline className='text-main2 text-[18px]'/>
              <p>General</p>
            </div>
        </div>

    </div>
  )
}

export default Settiings
