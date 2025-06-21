import Link from 'next/link'
import React from 'react'
import { FiEdit2 } from "react-icons/fi";
import { GoChevronRight } from "react-icons/go";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { PiUserFocusThin } from "react-icons/pi";
import { LiaEditSolid } from "react-icons/lia";
import { LiaEdit } from "react-icons/lia";
import { PiPasswordThin } from "react-icons/pi";
import { GoUnlock } from "react-icons/go";
import { PiTrashLight } from "react-icons/pi";

export const metadata = {
    title: "Settings — 𝗦𝘁ü𝗱𝘆𝗼 ",
}
const page = () => {
    
  return (
    <div className='max-w-[700px] h-full pt-[60px]  flex flex-col gap-[65px] mx-auto  w-full  '>

    

        <div className="w-full scale-90 grid grid-cols-2 gap-6">

            {/* <h1 className='col-span-2  text-white/90 font-NeueMontreal font-semibold text-[28px]'>Account</h1> */}
            <Link  href={'/Settings/Info'} className="w-full group justify-center flex flex-col gap-4 items-center p-4 h-[300px] hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-pointer   rounded bg-main2">
                <PiUserFocusThin className='text-white/70 group-hover:rotate-12 group-hover:text-green-500 ease-in-out duration-200 text-[52px]'/>
                <p className='text-[19px]  tracking-wide font-NeueMontreal capitalize font-semibold'>Your Personal info</p>
            </Link>
            <Link href={'/Settings/Edit-Profile'} className="w-full relative group justify-center flex flex-col gap-4 items-center p-4 h-[300px] hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-pointer   rounded bg-main2">
                <FiEdit2 className='text-white/65 group-hover:rotate-12 mb-2 group-hover:text-green-500 ease-in-out duration-200 text-[40px]'/>
                <p className='text-[19px]  tracking-wide font-NeueMontreal capitalize font-semibold'>Edit your profile</p>

                {/* <span className='absolute top-4 left-4 size-6 rounded-full border-[.5px] border-white/80'></span> */}
            </Link>
            <div className="w-full group justify-center flex flex-col gap-4 items-center p-4 h-[300px] hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-pointer   rounded bg-main2">
                <GoUnlock className='text-white/65 group-hover:rotate-12 mb-2 group-hover:text-green-500 ease-in-out duration-200 text-[40px]'/>
                <p className='text-[19px]  tracking-wide font-NeueMontreal capitalize font-semibold'>Change Your password</p>
            </div>
            <div className="w-full group justify-center flex flex-col gap-3 items-center p-4 h-[300px] hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-pointer   rounded bg-main2">
                <PiTrashLight className='text-white/65 group-hover:rotate-12 mb-2 group-hover:text-green-500 ease-in-out duration-200 text-[40px]'/>
                <p className='text-[19px]  tracking-wide font-NeueMontreal capitalize font-semibold'>Delete your account</p>
            </div>
        </div>
    </div>
  )
}

export default page
