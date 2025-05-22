import React from 'react'
import Logo from '@/public/Logo/Studyo_white.svg'
import google from '@/public/Logo/google.svg'
import Image from 'next/image'
import Link from 'next/link'
import { FaUser } from "react-icons/fa";

const Form = () => {
  return (
    <div className='w-full h-full p-6  bg-black/40 z-[10] '>
        <div className=" w-full flex justify-between items-center">
            <Image alt='Logo' className='w-[120px] fixed bottom-7 left-[70px] ' src={Logo} width={140} height={140}/>
            <p className=' fixed bottom-7 right-9 text-white text-[15px] opacity-85'>Already have an account?<Link className='underline opacity-100 font-bold' href={'/Auth/Login'}> Log in here.</Link></p>

        </div>

        <div className="w-full h-full flex  pt-20 gap-10 flex-col items-center">
            <div className="flex flex-col  px-7 items-center  rounded-xl bg-black/60 backdrop-blur-[10px] py-8 h-[640px] w-[520px]">
            {/* <Image alt='Logo' className='w-[80px] mb-4 ' src={Logo} width={140} height={140}/> */}
                <h1 className='text-white pt-3 font  text-center font-[700]   leading-[1.2]  text-[32px] max-w-[480px]'>Create Your Free Account & Start Listening.</h1>

                <div className="flex w-full max-w-[90%] justify-center flex-col gap-10 pt-20">
                    <div className="flex gap-3 hover:border-white duration-200 ease-in-out h-[52px] w-full items-center  justify-center border-white/50 border-[.5px] rounded-full">
                        <Image alt='Logo' className='w-[20px] relative -top-[1px] ' src={google} width={140} height={140}/>
                        <p className='text-white font-Montserrat font-semibold'>Sign up with Google</p>
                    </div>
                    <div className="grid items-center grid-cols-[1fr_auto_1fr] gap-3">
                        <div className="w-full  border-b-white/60  border-b-[.5px]"></div>
                        <p className='text-white/80 font-bold text-[14px]'>OR</p>
                        <div className="w-full  border-b-white/60 border-b-[.5px]"></div>
                    </div>
                    <div className="flex flex-col gap-[18px] w-full">
                        <div className="flex flex-col gap-3  w-full ">
                            <p className='text-white text-[14px] font-Montserrat font-medium'>Your email</p>
                            <input  placeholder='name@domain.com' type="text" className='flex px-4 outline-none hover:border-white duration-200 ease-in-out placeholder:text-white/50 text-white gap-3 h-[52px] text-[15.5px] w-full items-center justify-center border-white/70 border-[.5px] rounded-full' />
                        </div>
                        
                        <button className='flex text-main2 bg-white font-bold gap-3 hover:border-white duration-200 ease-in-out h-[52px] w-full items-center justify-center border-white/50 border-[.5px] rounded-full'>Create Your Account</button>
                        <h5 className='text-main text-center opacity-80  text-[11px] pt-3'>By creating an account you agree with our <span className='underline '>Terms of Service </span>, <span className='underline '> Privacy Policy</span> , and our default <span className='underline '> Notification Settings</span>.</h5>
                        {/* <p className=' text-right right-5 text-white text-[15px] opacity-85'>Already have an account?<Link className='underline opacity-100 font-bold' href={'/Login'}> Log in here.</Link></p> */}
                        

                    </div>
                </div>
            </div>

        </div>
            
    </div>
  )
}

export default Form



// Your Music, Your Way
// Ready to Discover & Create? Let’s Go!