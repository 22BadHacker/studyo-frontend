'use client'
import React, { useState, useEffect } from 'react'
import { IoMdPlay } from 'react-icons/io';
import Link from 'next/link';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxDotsVertical } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Album = ({public_id, id, title, cover_image, release_date}) => {

    const [open, setOpen] = useState(false);

     useEffect(() => {
          const handleClickOutside = (e) => {
            if (!e.target.closest(".oopen")) {
              setOpen(false);
            }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);

    
  return (
    <>
      <div  className='flex relative cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/40 duration-200 ease-in-out p-2 group  flex-col gap-[6px]' key={id}>
        <div className="relative ">
            <img className='h-[165px]  w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${cover_image}`} alt={title} />
            <span className="size-[45px] bottom-2 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                <IoMdPlay />
            </span>


        </div>

        <div className="w-full oopen relative mt-1 flex justify-between items-start">
            <div className="flex flex-col gap-[2px]">
                <Link href={`/album/${public_id}`}  className=" h-[26px]  relative inline-block   overflow-hidden font-semibold tracking-wide  text-[16.5px] font-NeueMontreal text-white/90 capitalize text-lg">
                    <h5 className="block transition-transform duration-300 relative top-[0px]  group-hover:-translate-y-full ease-in-out">{title}</h5>
                    <h5 className="absolute hover:underline ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{title}</h5>
                </Link>
                <p className='text-[12px] capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>{new Date(release_date).getFullYear()} <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span> album</p>
            </div>

            <button onClick={() => setOpen(!open)} className='text-[17px]  cursor-pointer top-2 relative'><RxDotsVertical /></button>

            {
                open && (
                    <div className="absolute  top-7 p-1 right-0 w-full flex  flex-col h-fit bg-[#1f1f1f]/50 backdrop-blur-[50px] rounded-md ">
                        <div className="flex capitalize hover:bg-[#121212] py-2 px-1 gap-4 items-center"><MdModeEdit size={24}/><p className='font-medium'>Edit album</p></div>
                        <div className="flex capitalize hover:bg-[#121212] py-2 px-1 gap-5 items-center"><FaTrash size={20}/><p className='font-medium'>Delete album</p></div>
                        {/* <div className="flex capitalize bg-[#121212] py-2 px-1 gap-4 items-center"><MdModeEdit size={24}/><p className='font-medium'>Edit album</p></div> */}
                    </div>
                )
            }
           
            


        </div>

        </div>
    </>
  )
}

export default Album
