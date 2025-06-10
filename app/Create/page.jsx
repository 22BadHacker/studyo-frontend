import React from 'react'
import { BsMusicNoteList } from "react-icons/bs";
import { PiMusicNotesPlusLight } from "react-icons/pi";
import { IoAlbumsOutline } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import Link from 'next/link';

export const metadata = {
  title: "Create — 𝗦𝘁ü𝗱𝘆𝗼 ",
}
const page = () => {
  return (
    <div className=''>
        <div className="flex w-full h-full flex-col gap-10 items-center">
            <h1 className='text-[35px] mix-blend-difference text-white font-NeueMontreal capitalize font-semibold'>What do you wanna create today?</h1>

          <div className="flex items-center scale-90 flex-col gap-2">

            <div className="flex rounded-lg w-[420px] p-1 bg-main2  flex-col gap-1 ">
                <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-4 backdrop-blur-2xl  h-fit ">
                  <span className='size-[65px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[30px] flex-center rounded-full mix-blend-difference text-white'><RiPlayListAddFill className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                  <div className="flex flex-col gap-1">
                      <p className='text-[19px] mix-blend-difference text-white   capitalize font-semibold'>Playlist</p>
                      <h5 className='text-white/70 tracking-wide font-NeueMontreal text-[14px]'>Create and share playlists that reflect your mood</h5>
                  </div>
                </div>
                
            </div>
            <Link href={'/Create/Album'} className="flex relative left-10 rounded-lg w-[420px] p-1 bg-main2  flex-col gap-1 ">
                <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-4 backdrop-blur-2xl  h-fit ">
                  <span className='size-[65px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[34px] flex-center rounded-full mix-blend-difference text-white'><IoAlbumsOutline className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                  <div className="flex flex-col gap-1">
                      <p className='text-[19px] mix-blend-difference text-white  capitalize font-semibold'>Album</p>
                      <h5 className='text-white/70 tracking-wide font-NeueMontreal text-[14px]'>Upload a collection of your best tracks</h5>
                  </div>
                </div>
                
            </Link>
            <div className="flex rounded-lg w-[420px] p-1 bg-main2  flex-col gap-1 ">
                <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-4 backdrop-blur-2xl  h-fit ">
                  <span className='size-[65px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[36px] flex-center rounded-full mix-blend-difference text-white'><PiMusicNotesPlusLight className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                  <div className="flex  flex-col gap-1">
                      <p className='text-[19px] mix-blend-difference text-white  capitalize font-semibold'>Track</p>
                      <h5 className='text-white/70 tracking-wide font-NeueMontreal text-[14px]'>let listeners discover your unique style instantly.</h5>
                  </div>
                </div>
                
            </div>
          </div>
        </div>
    </div>
  )
}

export default page
