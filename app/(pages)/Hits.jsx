'use client'
import Link from 'next/link'
import React from 'react'
import { IoMdPlay } from 'react-icons/io'
import { useAudio } from '@/context/AudioProvider'
import { moroccan, trackss } from '@/Data/data'

const Hits = () => {
    const {playTrack} = useAudio()
  return (
    <div className='relative -top-3'>
        <div className="flex pb-3 flex-col gap-2">
        <h1 className='text-2xl  hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>#Trending Moroccan Hits</h1>
        </div>
        <div className='  pt-1  h-auto w-full  grid grid-cols-8 gap-[2px]'>

            {
                moroccan.map((track, index) => (
                    <div key={index} className="w-full group p-[6px] hover:bg-main2/90 duration-200 ease-in-out rounded  relative flex flex-col gap-[7px]   ">
                        <div className="w-full cursor-pointer  relative ">
                            <img className='h-[185px]  w-[190px] saturate-[1.4] rounded-sm object-cover' src={track.cover} alt="" />
                             <span onClick={()=>playTrack({id: track.id, title: track.title, artist: track.artist, cover: track.cover, src: track.src})} className="size-[45px] bottom-2 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                                <IoMdPlay />
                            </span>
                        </div>

                        <div className="flex flex-col gap-[1px]">
                              <div className=" h-[26px]  relative inline-block   overflow-hidden font-semibold tracking-wide mt-1 text-[16.5px] font-NeueMontreal text-white/90 capitalize text-lg">
                                  <h5 className="block transition-transform duration-300 relative top-[0px]  group-hover:-translate-y-full ease-in-out">{track.title}</h5>
                                  <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{track.title}</h5>
                              </div>
                              
                              <Link className='ease-in-out duration-200 text-[12px] capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75' href={track.link}>
                              <span className='hover:underline hover:text-white'>{track.artist}</span>
                              {
                                track.artist2 && <span className='hover:underline hover:text-white'>, {track.artist2} </span>
                              }
                              {
                                track.artist3 && <span className='hover:underline hover:text-white'>, {track.artist3} </span>
                              }
                              </Link>
            
                            </div>
                </div>
            ))
        }

                            
        
           

        </div>
    </div>
  )
}

export default Hits
