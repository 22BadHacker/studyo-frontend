import React from 'react'
import { HiOutlineExternalLink } from "react-icons/hi";

const SettingsEdit = () => {
  return (
    
      <div className="bg-[#111] p-6 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl">
        <h1 className='font-NeueMontreal pb-5 text-white font-bold text-2xl'>Settings</h1>

        <div className="flex flex-col gap-1">
            <div className="w-full py-2 border-b-[.5px] border-b-white/40 flex justify-between items-center">
                <p className='font-NeueMontreal text-[15px] text-white font-medium'>Edit Your Info</p>
                <HiOutlineExternalLink />
            </div>
        </div>

      </div>
  )
}

export default SettingsEdit
