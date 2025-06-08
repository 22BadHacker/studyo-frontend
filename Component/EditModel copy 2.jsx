// components/EditProfileModal.jsx
'use client'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import EditProfileForm from './EditProfileForm';
import { RiCloseLargeLine } from 'react-icons/ri';

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
        <div className="w-full flex-center h-screen fixed top-0 left-0 bg-black/45  z-[200]">
            <div className="w-[600px] gap-7 h-[400px] shadow-2xl p-7 bg-gradient-to-tr from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#000]/10 border border-white/20 rounded backdrop-blur-md  flex flex-col">

              <div className="flex justify-between items-center">
                  <h1 className='font-NeueMontreal font-semibold text-[35px]'>Profile details</h1>
                  <RiCloseLargeLine className='cursor-pointer text-white/70 hover:text-white duration-200 ease-in-out' onClick={() => setOpen(false)} size={20} />

              </div>


                {/* <div className="flex items-center justify-between gap-5">

                    <div className='rounded-full  relative group size-[200px] overflow-hidden'>
                        {

                            user?.profile_image ? (
                            <img
                                src={`http://localhost:8000${user.profile_image}`}
                                // alt={user.username}
                                onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/Hand.jpeg'; // fallback image in /public
                              }}
                              
                              
                                className="rounded-full saturate-[1.2] size-full object-cover"
                            />
                            ) : (
                            <div className="size-fill flex items-center justify-center rounded-full bg-gray-400 text-white text-md font-bold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            )
                          }

                        <div className="absolute rounded-full top-0 left-0 group-hover:opacity-100 opacity-0 duration-200 ease-in-out bg-black/60 items-center flex p-7 justify-between flex-col size-full">
                            <p className='font-NeueMontreal text-[15px] cursor-pointer hover:underline '>Change Picture</p>
                            <FiEdit2 size={50}/>
                            <p className='font-NeueMontreal text-[15px] cursor-pointer hover:underline '>Remove Picture</p>
                        </div>

                    </div>
                    <div className="flex flex-col gap-4 items-end">
                      <input className='bg-main/20 font-NeueMontreal text-white py-2 px-2 rounded w-[320px] h-fit' type="text" value={user.username} onChange={(e) => setUsername(e.target.value)} />
                      <button className='bg-white font-semibold px-7 py-3 rounded-full text-[#222222] font-NeueMontreal' type='submit'>Save</button>

                    </div>

                </div> */}

            </div>
          </div>
       
      )}



    </>
  );
};

export default EditModel;



