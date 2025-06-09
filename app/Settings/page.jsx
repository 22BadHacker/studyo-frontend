import Link from 'next/link'
import React from 'react'
import { FiEdit2 } from "react-icons/fi";
import { GoChevronRight } from "react-icons/go";
import { RiAccountPinBoxFill } from "react-icons/ri";

export const metadata = {
    title: "Settings — 𝗦𝘁ü𝗱𝘆𝗼 ",
}
const page = () => {
  return (
    <div className='max-w-[700px]  flex flex-col gap-[65px] mx-auto  w-full  '>

        <div className="flex flex-col w-full rounded">
            <h1 className='py-2 mb-1  px-6 bg-main2 text-center text-white/90  font-NeueMontreal font-semibold text-[28px]'>Account</h1>

            <div className="flex text-white border-b-[.5px]  border-white/30  py-4 capitalize w-full justify-between items-center">
                <Link href={'/Settings/Info'} className='text-[16.5px] text-white/90 font-medium flex gap-3 items-center'><RiAccountPinBoxFill className='text-white text-[27px]'/> Your general info</Link>
                <GoChevronRight size={22}/>
            </div>
            <Link href={'/Settings/Edit-Profile'}  className="flex text-white border-b-[.5px]  border-white/30  py-4 capitalize w-full justify-between items-center">
                <p className='text-[16.5px] text-white/90 font-medium flex gap-3 items-center'><FiEdit2 className='text-white text-[22px] mr-2'/> Edit your profile</p>
                <GoChevronRight size={22}/>
            </Link>
        </div>
    </div>
  )
}

export default page
