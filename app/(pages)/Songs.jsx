'use client'
import Link from 'next/link'
import React from 'react'
import { IoMdPlay } from 'react-icons/io'
import { useAudio } from '@/context/AudioProvider'
import { trackss } from '@/Data/data'

const Songs = () => {
    const {playTrack} = useAudio()
  return (
    <div>
        <div className="flex pb-3 flex-col gap-2">
        <h1 className='text-2xl  hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Discover this Week on Stüdyo</h1>
          {/* <h1 className='text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Discography</h1> */}
          <div className="flex gap-3 items-center">
            <p className='text-[13px] py-[5px] capitalize px-4 rounded-full text-main2 bg-white'>popular releases</p>
            <p className='text-[13px] py-[5px] capitalize px-4 rounded-full bg-main2/60 backdrop-blur-2xl text-white'>New Songs</p>
            <p className='text-[13px] py-[5px] capitalize px-4 rounded-full bg-main2/60 backdrop-blur-2xl text-white'>Trending Artists</p>
          </div>

        </div>
        <div className='grid  pt-2 w-full h-auto grid-cols-5 gap-5'>

            {
                trackss.map((track, index) => (
                    <div key={index} className="w-full  relative flex flex-col gap-[10px]   ">
                        <div className="w-full rounded-md overflow-hidden cursor-pointer group relative h-[305px]">
                            <img className='w-full saturate-[1.3] h-full  object-cover' src={track.cover} alt="" />
                             <span onClick={()=>playTrack({id: track.id, title: track.title, artist: track.artist, cover: track.cover, src: track.src})} className="size-[55px] bottom-3 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[20px] right-3 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full">
                                <IoMdPlay />
                            </span>
                        </div>

                        <div className="w-full pt-[3px] flex gap-3">
                            <h4 className='text-2xl relative -top-[1px]  ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>{track.title}</h4>
                            <div className="flex gap-2 text-[12.5px] font-semibold items-center">
                                <img className='size-[29px] rounded-full object-cover' src={track.profileImage} alt="" />
                                <Link className='hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold' href={track.link}>{track.artist}</Link>

                                {
                                    track.artist2 && (
                                        <>
                                            ,
                                            <div className='flex gap-2 text-[12.5px] font-semibold items-center'>
                                                <img className='size-[29px] rounded-full object-cover' src={track.profileImage2} alt="" />
                                                <Link className='hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold' href={track.link2}>{track.artist2}</Link>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                    </div>
                </div>
            ))
        }

                            
        
           

        </div>
    </div>
  )
}

export default Songs
