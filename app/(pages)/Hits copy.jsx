'use client'
import Link from 'next/link'
import React from 'react'
import { IoMdPlay } from 'react-icons/io'
import { useAudio } from '@/context/AudioProvider'
import { moroccan, trackss } from '@/Data/data'

const Hits = () => {
    const {playTrack} = useAudio()
  return (
    <div>
        <div className="flex pb-3 flex-col gap-2">
        <h1 className='text-2xl  hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>#Trending Moroccan Hits</h1>
        </div>
        <div className='grid  pt-1 w-full h-auto grid-cols-7 gap-[12px]'>

            {
                moroccan.map((track, index) => (
                    <div key={index} className="w-full group p-[6px] hover:bg-main2/80 rounded  relative flex flex-col gap-[8px]   ">
                        <div className="w-full cursor-pointer  relative h-[205px]">
                            <img className='w-full saturate-[1.2] h-full rounded object-cover' src={track.cover} alt="" />
                             <span onClick={()=>playTrack({id: track.id, title: track.title, artist: track.artist, cover: track.cover, src: track.src})} className="size-[54px] bottom-3 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[22px] right-3 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full">
                                <IoMdPlay />
                            </span>

                            {/* <div className="absolute w-6 h-6 flex-center rounded-full bg-black/50 backdrop-blur-2xl top-2 left-2">
                              {index+1}
                            </div> */}
                        </div>

                        <div className="w-full pt-[0px] flex flex-col ">
                            <h4 className='text-[19px]  relative -top-[1px]  ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>{track.title}</h4>
                            <Link className='hover:underline ease-in-out duration-200 text-[13px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/80' href={track.link}>{track.artist}</Link>
                           
                        </div>
                </div>
            ))
        }

                            
        
           

        </div>
    </div>
  )
}

export default Hits
