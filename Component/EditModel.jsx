// components/EditProfileModal.jsx
'use client'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import EditProfileForm from './EditProfileForm';
import { RiCloseLargeLine } from "react-icons/ri";

const EditModel = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-main2/80 rounded-full text-white px-4 py-2 font-semibold hover:bg-main2/80"
      >
        Edit Profile
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="relative bg-white/10 backdrop-blur-xl  scale-90 rounded-xl  p-7 w-[550px] gap-7 h-[350px] flex flex-col shadow-xl">

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
