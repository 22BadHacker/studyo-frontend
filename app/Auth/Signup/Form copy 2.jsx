'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/Logo/Studyo_white.svg';
import google from '@/public/Logo/google.svg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Svg from '@/Component/Svg';
import { useAppHook } from '@/context/AppProvider';
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { motion } from 'framer-motion';

const Form = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  // Login Context
  const {register} = useAppHook();

  
    // Email Pattern
  const isValidEmail = /^\S+@\S+\.\S+$/.test(formData.email);

    // Form  Validation 
  const isFormValid =
    formData.username.trim() !== '' &&
    formData.password.length >= 6 &&
    isValidEmail;
    

    // Handle Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setTouched(false);
    }
  };

  // Handle Blur
  const handleBlur = (e) => {
        if (e.target.name === "email") {
        setTouched(true);
        }
    };

    //   Handle Password Visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);


  const handleFormSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        
        await new Promise((res) => setTimeout(res, 3000));
        
        await register(formData);
        setLoading(false);


    }

  return (
    <div className="w-full h-full p-6 bg-black/40 z-[10]">
      
      {/* Form Steps */}
      <div className="w-full h-full flex justify-center gap-10 flex-col items-center">
        <motion.form initial={{ opacity:0, filter: 'blur(10px)'}} animate={{ opacity:1, filter: 'blur(0px)'}} transition={{ duration: 0.3,delay: 0.3, ease: 'easeInOut', type: 'tween' }} onSubmit={handleFormSubmit} className="flex border-[.5px] border-white/10 flex-col px-7 items-center rounded-xl bg-gradient-to-r from-[#000]/60 via-[#000]/30 to-[#0000]/60  backdrop-blur-[50px] py-8 h-[645px] w-[520px]">
          {step === 1 && (
            <>
              <h1 className="text-white pt-3 font-bold font-NeueMontreal text-center leading-[1.2] text-[34px] max-w-[480px]">
                Create Your Free Account & Start Listening.
              </h1>
              <div className="flex w-full max-w-[90%] flex-col gap-10 pt-[65px]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex gap-3 hover:border-white duration-200 h-[52px] w-full items-center justify-center border-white/50 border-[0.5px] rounded-full"
                >
                  <Image alt="Google" src={google} className="w-[20px]" />
                  <span className="text-white/90 font-NeueMontreal font-medium tracking-wide text-[16.5px]">Sign up with Google</span>
                </button>

                <div className="grid pt-2 items-center grid-cols-[1fr_auto_1fr] gap-3">
                  <div className="w-full border-b-white/50 border-b-[.5px]" />
                  <p className='text-white/80 font-NeueMontreal font-bold text-[14.5px]'>OR</p>
                  <div className="w-full border-b-white/50 border-b-[.5px]" />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-white font-InterTight text-[14.5px] tracking-wide  font-medium">
                    Your email
                  </label>
                    <input
                      name="email"
                      value={formData.email}
                      type="email"
                      placeholder="you@example.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 px-4 font-NeueMontreal duration-200 ease-in-out py-3 placeholder:text-white/60 text-white bg-transparent border-[0.5px] rounded-full outline-none ${
                        !isValidEmail && touched
                          ? 'border-red-500'
                          : 'border-white/60 hover:border-white'
                      }`}
                    />
                  {!isValidEmail && touched && (
                    <p className="text-red-500 font-InterTight fixed right-12 pt-[2px] text-[12px] font-medium">
                      Please enter a valid email address.
                    </p>
                  )}

                  <button
                    type="button"
                    disabled={!isValidEmail}
                    onClick={() => setStep(2)}
                    className={`h-[52px] rounded-full  border-[.5px] font-bold mt-2 ${
                      !isValidEmail
                        ? 'bg-main/15 text-white/30 border-main/15 cursor-not-allowed'
                        : 'bg-white text-main2 border-white/50  cursor-pointer'
                    }`}
                  >
                    Create Your Account
                  </button>

                  <p className="text-main font-InterTight tracking-wide text-center text-[11px] pt-5 opacity-90">
                    By creating an account you agree with our{' '}
                    <span className="underline">Terms of Service</span>,{' '}
                    <span className="underline">Privacy Policy</span>, and our default{' '}
                    <span className="underline">Notification Settings</span>.
                  </p>

                  <p className=' w-full rounded-[11px]  fixed bottom-4  right-12 text-right text-white text-[13.5px] pt-2 '>Already have an account?<Link className='underline text-green-500 opacity-100 font-bold' href={'/Auth/Login'}> Log in here.</Link></p>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
            <div onClick={() => setStep(1)}  className="flex text-green-500 left-6 top-5 absolute  gap-2 items-center cursor-pointer">
              <LiaLongArrowAltLeftSolid className='text-[19px]' />
              <button
                type="button"
                
                className=" flex uppercase font-NeueMontreal tracking-wide font-bold items-center gap-1 cursor-pointer   text-[12.5px] border-b"
              >
                Back
              </button>

            </div>
              <div className="text-center">
                <h1 className="text-white font-NeueMontreal  pt-6 font-bold text-[34px] tracking-[0.5px] leading-[1.2] max-w-[480px]">
                  Final details, we promise.
                </h1>
                <p className="text-white/70 uppercase relative top-2 font-InterTight font-normal text-[12px] tracking-wide">
                  Pick the name others will see on your profile.
                </p>
              </div>
              <div className="w-full relative max-w-[90%] pt-[52px] flex flex-col gap-4">
                {/* <div className="w-full absolute top-7 border-dashed border-b-[.5px] border-b-white/20"></div> */}
                <div className="flex pb-1 flex-col gap-1">

                    <label className="text-white/90 pb-1 font-InterTight text-[14px] tracking-wide font-normal">
                    Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 text-white text-[13.5px] px-3 py-3 bg-transparent border-[0.5px] border-white/50 rounded-full outline-none hover:border-white"
                    />
                </div>
                <div className="flex pb-1 flex-col gap-1">

                    <label className="text-white/90 pb-1 font-InterTight text-[14px] tracking-wide font-normal">
                    Email Adress
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 text-white text-[13.5px] px-3 py-3 bg-transparent border-[0.5px] border-white/50 rounded-full outline-none hover:border-white"
                    />
                </div>

            

                <label className="text-white/90 pb-1 font-InterTight text-[14px] tracking-wide font-normal">
                  Password
                  <div className="mt-2  flex items-center px-4 bg-transparent border-[0.5px]  border-white/50 hover:border-white rounded-full">
                    <input
                    placeholder=''
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="flex-1 py-3 text-white bg-transparent outline-none border-none"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-[17px] cursor-pointer text-white"
                    >
                      {showPassword ? <BsEye /> : <BsEyeSlash />}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`h-[52px] mt-1 flex items-center justify-center overflow-hidden duration-200 ease-in-out  border-[.5px] rounded-full font-bold ${
                    !isFormValid || loading ? 'bg-main/15 text-white/30  border-main/15 cursor-not-allowed' : 'bg-white text-main2  border-white/50 cursor-pointer' }`}>
                      {loading ? (
                      <Svg/>
                       
                      ) : (
                        "Continue"
                      )}
                  
                </button>

                <p className="text-main  font-InterTight tracking-wide  text-center text-[11px] pt-3 opacity-90">
                  By creating an account you agree with our{' '}
                  <span className="underline">Terms of Service</span>,{' '}
                  <span className="underline">Privacy Policy</span>, and our default{' '}
                  <span className="underline">Notification Settings</span>.
                </p>
                <p className=' w-full rounded-[11px]  fixed bottom-4  right-12 text-right text-white text-[13.5px] pt-2 '>Already have an account?<Link className='underline text-green-500 opacity-100 font-bold' href={'/Auth/Login'}> Log in here.</Link></p>
              </div>
            </>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default Form;
