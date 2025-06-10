import React from 'react'
import { BsMusicNoteList } from "react-icons/bs";
import { PiMusicNotesPlusLight } from "react-icons/pi";

const page = () => {
  return (
    <div className='w-full relative bg-black/40 min-h-screen h-full flex-center'>
        <div className="flex w-full h-full flex-col gap-10 items-center">
            <h1 className='text-[35px] mix-blend-difference text-white font-NeueMontreal capitalize font-semibold'>What do you wanna create today?</h1>

            <div className="flex rounded-lg w-[400px] p-1 bg-main2  flex-col gap-1 ">
                <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-4 backdrop-blur-2xl  h-fit ">
                  <span className='size-[65px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[36px] flex-center rounded-full mix-blend-difference text-white'><PiMusicNotesPlusLight className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                  <div className="flex flex-col gap-1">
                      <p className='text-[19px] mix-blend-difference text-white font-NeueMontreal capitalize font-semibold'>Playlist</p>
                      <h5 className='text-white/70 tracking-wide font-NeueMontreal text-[14px]'>Create a playlist with songs you like</h5>
                  </div>
                </div>
                <div className="w-[90%] border-b-[.5px] border-white/50 "></div>
                <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-4 backdrop-blur-2xl  h-fit ">
                  <span className='size-[65px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[36px] flex-center rounded-full mix-blend-difference text-white'><PiMusicNotesPlusLight className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                  <div className="flex flex-col gap-1">
                      <p className='text-[19px] mix-blend-difference text-white font-NeueMontreal capitalize font-semibold'>Playlist</p>
                      <h5 className='text-white/70 tracking-wide font-NeueMontreal text-[14px]'>Create a playlist with songs you like</h5>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
