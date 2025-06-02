'use client'
import React, { useEffect, useState } from 'react'
import Logo from '@/public/Logo/Studyo_white.svg'
import google from '@/public/Logo/google.svg'
import Image from 'next/image'
import Link from 'next/link'
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import Svg from '@/Component/Svg'
import { useAppHook } from '@/context/AppProvider';
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react';

const Form = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
    password: "",
    email: "",
    });


    // Login Context
    const {login, authToken} = useAppHook();

    // useEffect(() => {
    //     if(authToken){
    //         router.push('/')
    //     }
    // }, [authToken, loading]);
    
    // Email Pattern
    const isValidEmail = /^\S+@\S+\.\S+$/.test(formData.email);

    // Email and Password Validation
    const isFormValid =
    isValidEmail &&
    formData.password.trim().length >= 6;


    // Handle inputs Changes
    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });

        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));

        if (name === "email") {
        setTouched(false);
        }
    };


    const handleFormSubmit = async(e) => {
        e.preventDefault();
         setLoading(true);
         
         await new Promise((res) => setTimeout(res, 3000));
         
         await login(formData);
         
         setLoading(false);
    }

    const handleBlur = (e) => {
        if (e.target.name === "email") {
        setTouched(true);
        }
    };


    
  return (
    <div className='w-full h-full p-6  bg-black/40 z-[10] '>
       
        <div className="w-full h-full flex  justify-center gap-10 flex-col items-center">
            <motion.div initial={{ opacity:0, filter: 'blur(10px)'}} animate={{ opacity:1, filter: 'blur(0px)'}} transition={{ duration: 0.3,delay: 0.3, ease: 'easeInOut', type: 'tween' }} className="flex flex-col border-[.5px] border-white/10 px-7 items-center  rounded-xl bg-gradient-to-t from-[#000]/60 via-[#000]/20 to-[#0000]/60 backdrop-blur-[50px] py-8 h-[715px] w-[530px]">
                <h1 className='text-white pt-3 font-NeueMontreal  text-center font-[700]   leading-[1.2]  text-[34px] max-w-[480px]'>Whether You Listen or Create Music — Welcome Back</h1>

                <div className="flex  w-full max-w-[90%] justify-center flex-col gap-10 pt-[62px]">
                    <button onClick={() => signIn("google", { redirect: false })}  className="flex gap-3 cursor-pointer hover:bg-main2/40 backdrop-blur-[4px] hover:border-white duration-200 ease-in-out h-[52px] w-full items-center  justify-center border-white/50 border-[.5px] rounded-full">
                        <Image alt='Logo' className='w-[20px] relative -top-[1px] ' src={google} width={140} height={140}/>
                        <p className='text-white/90 text-[16.5px] font-NeueMontreal font-medium tracking-wide'>Continue with Google</p>
                    </button>
                    <div className="grid pt-2 items-center grid-cols-[1fr_auto_1fr] gap-3">
                        <div className="w-full  border-b-white/50  border-b-[.5px]"></div>
                        <p className='text-white/80 font-NeueMontreal font-bold text-[14.5px]'>OR</p>
                        <div className="w-full  border-b-white/50 border-b-[.5px]"></div>
                    </div>
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-[16px] w-full">
                        <div className="flex flex-col gap-3  w-full ">
                            <p className='text-white tracking-wide font-InterTight text-[14.5px]  font-medium'>Your email</p>
                            <input onBlur={handleBlur} placeholder="example@email.com" value={formData.email} name='email'
                            onChange={handleChange} type="text" className={`flex font-NeueMontreal duration-200 ease-in-out px-4 ${!isValidEmail && touched ? "border-red-500" : "border-white/60 hover:border-white"} outline-none  duration-200 ease-in-out placeholder:text-white/50 text-white gap-3 h-[52px] text-[16px] w-full items-center justify-center border-[.5px] rounded-full`} />
                            {!isValidEmail && touched && (
                            <p className="w-full font-InterTight fixed right-[50px] text-right text-red-500 pt-[2px] text-[12.5px] ">Please enter a valid email.</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3  w-full ">
                            <p className='text-white tracking-wide font-InterTight text-[14px]  font-medium'>Password</p>
                            <div className="grid grid-cols-[1fr_auto]  px-4 outline-none hover:border-white duration-200 ease-in-out placeholder:text-white/50 text-white gap-[10px] h-[52px] text-[15.5px] w-full items-center justify-center border-white/70 border-[.5px] rounded-full">
                                <input placeholder="••••••••••••••••••••••••" name="password"
                                value={formData.password}
                                onChange={handleChange}  type={showPassword ? "text" : "password"} className={`outline-none placeholder:text-[15.5px] text-white/95 tracking-wide font-NeueMontreal duration-200 ease-in-out placeholder:tracking-wider  border-none w-full`} />
                                {
                                    formData.password && (

                                        <button type='button'  className='cursor-pointer text-[17px]' onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <BsEye /> : <BsEyeSlash />}</button>
                                    )
                                }
                            </div>
                        </div>
                        <button  type="submit" disabled={!isFormValid || loading}  className={`flex items-center justify-center ${!isFormValid || loading ? 'bg-main/15 text-white/30 border-main/15 cursor-not-allowed' :  'bg-white text-main2 border-white/50 cursor-pointer'} hover:bg-green    mt-1 text-main2 font-bold gap-3  duration-200 ease-in-out h-[52px] w-full items-center justify-center  border-[.5px] rounded-full`}>
                        {loading ? (
                      <Svg/>
                       
                      ) : (
                        "Enter the Stüdyo"
                      )}</button>

                        <div className="flex opacity-90 items-center justify-between pt-1">
                            <label className="label text-white/90 text-[13px] font-medium font-InterTight">
                                <input  type="checkbox"  className="checkbox relative -top-[1px] checkbox-md scale-95" />
                                Remember me
                            </label>
                            <Link href={'/'} className='text-white/90 text-[13px] font-medium font-InterTight underline'>Forget  password</Link>
                        </div>
                       <p className=' w-full  fixed bottom-4  right-12 text-right text-white text-[13.5px] pt-2 '>Don't have an account?<Link className='underline text-green-500  opacity-100 font-bold' href={'/Auth/Signup'}> Sign up for Stüdyo</Link></p>
                       {/* <p className=' w-full py-3 border-black/40 border-dashed border-[1px] rounded-[11px]  fixed -bottom-11 bg-black/10 backdrop-blur-[20px] left-0 text-center text-white text-[13.5px] pt-2 opacity-85'>Don't have an account?<Link className='underline opacity-100 font-bold' href={'/Auth/Signup'}> Sign up for Stüdyo</Link></p> */}

                        

                    </form>
                </div>
            </motion.div>

        </div>
            
    </div>
  )
}

export default Form



// Your Music, Your Way
// Ready to Discover & Create? Let’s Go!

// ${!isEmailAndPasswordValid && 'opacity-50'}