import React from 'react'
import Image from 'next/image'
import imagess from '@/public/images/img30.jpg' 
import logo from '@/public/Logo/Studyo_white.svg'


export const metadata = {
    title: "Site Credits — 𝗦𝘁ü𝗱𝘆𝗼 ",  
};




const page = () => {
  return (
    <div className='w-full  h-screen bg-[#dddee2] overflow-hidden relative'>
        <div className=" size-full relative flex items-end justify-start  gap-6 p-6">

        </div>
            <div className="h-[400px] container items-end flex w-full gap-6">

                <div className="flex  flex-col gap-4">
                    <h1 className='text-[210px] leading-[.8] flex items-center   font-semibold font-NeueMontreal text-[#0b0b0b]'>Credits</h1>
                </div>
                <div className="flex  pb-3 h-fit items-start flex-wrap gap-2 leading-[1.05]">
                    <div className="flex  flex-wrap items-center gap-[6px] leading-[1]">
                        <div className="flex   font-NeueMontreal gap-[5px] text-[16px] capitalize font-normal text-[#e82525] items-center"><span className='size-[8.5px] bg-[#e82525] rounded-full'></span>Website Name <span className='pl-[3px]  text-[#0b0b0b]'> / Stüdyo</span></div>
                        <div className="flex  font-NeueMontreal  gap-[5px] text-[16px] capitalize font-normal text-[#e82525] items-center"><span className='size-[8.5px] bg-[#e82525] rounded-full'></span>Site Design & Development <span className='pl-[3px]  text-[#0b0b0b]'> / Mounir lagzouli</span></div>
                        <div className="flex  font-NeueMontreal  gap-[5px] text-[16px] capitalize font-normal text-[#e82525] items-center"><span className='size-[8.5px] bg-[#e82525] rounded-full'></span>supervisor <span className='pl-[3px]  text-[#0b0b0b]'> / el harti mohammed</span></div>
                        <div className=" flex font-NeueMontreal  gap-[5px] text-[16px] capitalize font-normal text-[#e82525] items-center"><span className='size-[8.5px] bg-[#e82525] rounded-full'></span>Frontend <span className=' pl-[3px] text-[#0b0b0b]'> / Next jS, Tailwind CSS</span></div>
                        <div className="flex  font-NeueMontreal  gap-[5px] text-[16px]  capitalize font-normal text-[#e82525] items-center"><span className='size-[8.5px] bg-[#e82525] rounded-full'></span>Backend <span className=' pl-[3px] text-[#0b0b0b]'> / Laravel (API), MySQL</span></div>
                        <div className=" flex font-NeueMontreal gap-1 text-[16px] capitalize font-normal text-[#e82525] items-center"><span className='size-[8px] bg-[#e82525] rounded-full'></span>Copyright <span className=' pl-[3px] text-[#0b0b0b]'> / © {new Date().getFullYear()} Studyo by Mounir Lagzouli.</span></div>
                    </div>
                </div>

            </div>
    </div>
  )
}

export default page

// {/* <div className="flex gap-2 text-[18px] uppercase font-semibold text-[#e82525] items-center"><span className='size-2 bg-[#e82525] rounded-full'></span>Design & Branding: <span className='font-[800] text-black'>/ Stüdyo</span></div> */}