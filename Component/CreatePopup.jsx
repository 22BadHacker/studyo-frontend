import React from 'react'
import { BsMusicNoteList } from "react-icons/bs";
import { PiMusicNotesPlusLight } from "react-icons/pi";
import { IoAlbumsOutline } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import Link from 'next/link';


const CreatePopup = ({setDrop}) => {
  return (
    <div className=''>
        <div className="flex w-fit relative h-full flex-col gap-10 items-center">
            {/* <h1 className='text-[35px] mix-blend-difference text-white font-NeueMontreal capitalize font-semibold'>What do you wanna create today?</h1> */}

        <button onClick={setDrop} className='absolute -top-6 text-lg hover:text-red-500 cursor-pointer font-NeueMontreal font-semibold right-6'>Close</button>
          <Link href={'/Create/Playlist'} className="flex p-1 gap-1 rounded items-center scale-90 bg-main2 flex-col ">
            <div className="flex rounded-lg w-[420px]  bg-main2  flex-col gap-1 ">
                <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-5 backdrop-blur-2xl  h-fit ">
                  <span className='size-[64px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[28px] flex-center rounded-full mix-blend-difference text-white'><RiPlayListAddFill className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                  <div className="flex flex-col gap-[4px]">
                      <p className='font-NeueMontreal font-semibold  text-[19px] text-white capitalize text-lg'>Playlist</p>
                      <h5 className='text-[13px] tracking-wide capitalize font-medium font-NeueMontreal relative -top-[2px] text-white/75'>Create and share playlists that reflect your mood</h5>
                  </div>
                </div>
            </div>

            <div className="w-[95%]  border-b-[.5px] border-white/40"></div>
                
            <Link href={'/Create/Album'} className="flex relative  rounded-lg w-[420px]  bg-main2  flex-col gap-1 ">
                <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-5 backdrop-blur-2xl  h-fit ">
                  <span className='size-[64px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[33px] flex-center rounded-full mix-blend-difference text-white'><IoAlbumsOutline className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                  <div className="flex flex-col gap-1">
                      <p className='font-NeueMontreal font-semibold  text-[19px] text-white capitalize text-lg'>Album</p>
                      <h5 className='text-[13px] tracking-wide capitalize font-medium font-NeueMontreal relative -top-[2px] text-white/75'>Upload a collection of your best tracks</h5>
                  </div>
                </div>
                
            </Link>
            {/* <div className="w-[95%]  border-b-[.5px] border-white/40"></div> */}
            <Link href={'/Create/Track'} className="flex rounded-lg w-[420px]  bg-main2  flex-col gap-1 ">
                <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-5 backdrop-blur-2xl  h-fit ">
                  <span className='size-[64px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[34px] flex-center rounded-full mix-blend-difference text-white'><PiMusicNotesPlusLight className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                  <div className="flex  flex-col gap-1">
                      <p className='font-NeueMontreal font-semibold  text-[19px] text-white capitalize text-lg'>Track</p>
                      <h5 className='text-[13px] tracking-wide capitalize font-medium font-NeueMontreal relative -top-[2px] text-white/75'>let listeners discover your unique style instantly.</h5>
                  </div>
                </div>
                
            </Link>
          </Link>
        </div>
    </div>
  )
}

export default CreatePopup
