// components/EditProfileModal.jsx
'use client'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import EditProfileForm from './EditProfileForm';
import { RiCloseLargeLine } from "react-icons/ri";
import { FiEdit2 } from 'react-icons/fi';

const EditModel = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      
      <div onClick={() => setOpen(true)}  className="cursor-pointer relative bg-main/15 text-[18px]  text-white/80 hover:text-white size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out  transition"><FiEdit2 size={17}/> <span className="absolute group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[95px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/2 -translate-x-1/2">Edit Your Profile</span></div>

      {open && (
        <div className="fixed  top-0 left-0 flex-center right-0 bottom-0 backdrop-blur-xs z-[9999] bg-black/60 flex justify-center items-center">
          <div className="relative  bg-[#111] border border-white/10 shadow-2xl backdrop-blur-xl  scale-90 rounded-xl  p-7 w-[550px] gap-7 h-[350px] flex flex-col ">

            <div className="flex relative -top-2 justify-between items-center">
                  <h1 className='font-NeueMontreal text-white font-semibold text-[26px]'>Profile details</h1>
                  <RiCloseLargeLine className='cursor-pointer text-white/70 hover:text-white duration-200 ease-in-out' onClick={() => setOpen(false)} size={18} />

              </div>
            
            <EditProfileForm />

          </div>
        </div>
      )}
    </>
  );
};

export default EditModel;
