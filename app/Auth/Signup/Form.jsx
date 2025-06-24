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
import art from '@/public/artist.webp'
import art2 from '@/public/Hand.jpeg'
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const Form = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Form Data
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: '', 
  });

  // Login Context
  const {register} = useAppHook();

  // Email Pattern
  const isValidEmail = /^\S+@\S+\.\S+$/.test(formData.email);
  
  const passwordChecks = {
    length: formData.password.length >= 8,
    lowercase: /[a-z]/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password),
    // number: /[0-9]/.test(formData.password),
    // special: /[^A-Za-z0-9]/.test(formData.password),
  };
  // Form Validation 
  const isFormValid =
    formData.username.trim() !== '' &&
    passwordChecks.length &&
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

  // Handle Password Visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise((res) => setTimeout(res, 3000));
    
    await register(formData);
    setLoading(false);
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
    setStep(2);
  }

  return (
    <div className="w-full h-full p-6 bg-black/40 z-[10]">
      
      {/* Form Steps */}
      <div className="w-full h-full flex justify-center gap-10 flex-col items-center">
        <motion.form initial={{ opacity:0, filter: 'blur(10px)'}} animate={{ opacity:1, filter: 'blur(0px)'}} transition={{ duration: 0.3,delay: 0.3, ease: 'easeInOut', type: 'tween' }} onSubmit={handleFormSubmit} className={`flex ${step === 1 ? 'flex flex-col justify-center items-center w-[850px]' : 'border-[.5px] border-white/10 flex-col px-7 items-center rounded-xl bg-gradient-to-r from-[#000]/60 via-[#000]/30 to-[#0000]/60  backdrop-blur-[50px] py-8 h-[645px] w-[520px]'} `}>
          {step === 1 && (
            <>
              <h1 className="text-[#c42b1c] uppercase pt-3 font-semibold tracking-wide font-NeueMontreal text-center leading-[1] text-[65px] ">
                Get access to Stüdyo 
              </h1>
              <p className="text-white/95 mt-2 font-NeueMontreal font-semibold text-[16px] tracking-wide">
                First, tell us who you are.
              </p>
              
              <div className="flex w-full max-w-[90%] flex-col gap-6 pt-[70px]">
                {/* Role Selection Cards */}
                <div className="flex items-center w-full justify-center gap-12">
                  <div 
                    onClick={() => handleRoleSelect('artist')}
                    className={`flex-center w-[350px] h-[290px] backdrop-blur-[50px] scale-[.98] rounded-lg border-[1px] flex flex-col gap-4 items-center cursor-pointer transition-all duration-200 ${
                      selectedRole === 'artist' 
                        ? 'border-white/80 bg-main/10' 
                        : 'border-white/30 hover:bg-black/10 bg-gradient-to-l from-[#000]/40 via-[#000]/20 to-[#0000]/60 hover:border-white/60'
                    }`}
                  >
                    <h3 className="text-white font-Oswald text-[21px] underline tracking-wider font-bold">Artist or Manager</h3>
                    {/* <p className="text-white/60 mt-1 font-InterTight text-[13px]">For musicians and their teams</p> */}
                    <Image alt='art' src={art} className=' size-[160px] rounded-full object-cover'/>
                  </div>
                  <div 
                    onClick={() => handleRoleSelect('user')}
                    className={`flex-center scale-[.98] w-[350px] h-[290px]  rounded-lg border-[1px] flex flex-col gap-4 items-center cursor-pointer transition-all duration-200 ${
                      selectedRole === 'user' 
                        ? 'border-white/80 bg-main/10' 
                        : 'border-white/30  hover:bg-black/10 bg-gradient-to-t from-[#000]/40 via-[#000]/20 to-[#0000]/60 hover:border-white/60'
                    }`}
                  > 
                    <h3 className="text-white font-Oswald  text-[21px] underline tracking-wider font-bold">Music Listener</h3>
                    {/* <p className="text-white/60 mt-1 font-InterTight text-[13px]">For fans and music enthusiasts</p> */}
                    <Image alt='art' src={art2} className=' size-[160px] rounded-full object-cover'/>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-white  font-NeueMontreal tracking-wide font-normal  text-[16.5px] pt-4 text-center">
                    If you're already have an account, <Link href={'/Auth/Login'} className="underline  font-semibold cursor-pointer text-green-500">Log in</Link>
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div onClick={() => setStep(1)} className="flex text-green-500 left-6 top-5 absolute gap-2 items-center cursor-pointer">
                <LiaLongArrowAltLeftSolid className='text-[19px]' />
                <button
                  type="button"
                  className="flex uppercase font-NeueMontreal tracking-wide font-bold items-center gap-1 cursor-pointer text-[12.5px] border-b"
                >
                  Back
                </button>
              </div>
              
              <h1 className="text-white pt-12 font-bold font-NeueMontreal text-center leading-[1.2] text-[34px] max-w-[480px]">
                Create Your Free Account
              </h1>
              
              <div className="flex w-full max-w-[90%] flex-col gap-12 pt-[45px]">
                <button
                  type="button"
                  onClick={() => setStep(3)}
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
                  <label className="text-white font-InterTight text-[14.5px] tracking-wide font-medium">
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
                    onClick={() => setStep(3)}
                    className={`h-[52px] rounded-full border-[.5px] font-bold mt-2 ${
                      !isValidEmail
                        ? 'bg-main/15 text-white/30 border-main/15 cursor-not-allowed'
                        : 'bg-white text-main2 border-white/50 cursor-pointer'
                    }`}
                  >
                    Continue
                  </button>

                  <p className="text-main font-InterTight tracking-wide text-center text-[11px] pt-5 opacity-90">
                    By continuing, you agree with our{' '}
                    <span className="underline">Terms of Service</span>,{' '}
                    <span className="underline">Privacy Policy</span>, and our default{' '}
                    <span className="underline">Notification Settings</span>.
                  </p>

                  <p className='w-full rounded-[11px] fixed bottom-4 right-12 text-right text-white text-[13.5px] pt-2'>
                    Already have an account?<Link className='underline text-green-500 opacity-100 font-bold' href={'/Auth/Login'}> Log in here.</Link>
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div onClick={() => setStep(2)} className="flex text-green-500 left-6 top-5 absolute gap-2 items-center cursor-pointer">
                <LiaLongArrowAltLeftSolid className='text-[19px]' />
                <button
                  type="button"
                  className="flex uppercase font-NeueMontreal tracking-wide font-bold items-center gap-1 cursor-pointer text-[12.5px] border-b"
                >
                  Back
                </button>
              </div>
              
              <div className="text-center">
                <h1 className="text-white font-NeueMontreal pt-[40px] font-bold text-[34px] tracking-[0.5px] leading-[1.2] max-w-[480px]">
                  Final details, we promise.
                </h1>
                <p className="text-white/70 uppercase relative top-2 font-InterTight font-normal text-[12px] tracking-wide">
                  Pick the name others will see on your profile.
                </p>
              </div>
              
              <div className="w-full relative max-w-[90%] pt-[45px] flex flex-col gap-4">
                <div className="flex pb-1 flex-col gap-1">
                  <label className="text-white/90 pb-1 font-InterTight text-[15px] tracking-wide font-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 font-semibold text-white text-[13.5px] px-3 py-3 bg-transparent border-[0.5px] border-white/50 rounded-[12px] outline-none hover:border-white"
                  />
                </div>
                
               

                <label className="text-white/90 pb-1 font-InterTight text-[15px] tracking-wide font-semibold">
                  Password
                  <div className="mt-2 flex items-center px-3 bg-transparent border-[0.5px] border-white/50 hover:border-white rounded-[12px]">
                    <input
                      placeholder=''
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="flex-1 py-3  text-[13.5px] text-white bg-transparent outline-none border-none"
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

                <div className="py-1 text-[13px] text-white font-InterTight space-y-[6px]">
                    {Object.entries(passwordChecks).map(([key, isValid]) => {
                      const conditionText = {
                        length: 'At least 8 characters',
                        lowercase: 'Contains a lowercase letter',
                        uppercase: 'Contains an uppercase letter',
                        // number: 'Contains a number',
                        // special: 'Contains a special character',
                      }[key];

                      return (
                        <div key={key} className="flex font-NeueMontreal tracking-wide capitalize items-center gap-2">
                          {isValid ? (
                            <FaCheckCircle className="text-green-400 relative -top-[1px]" />
                          ) : (
                              <span  className="relative -top-[.5px] size-[12.8px]  rounded-full border-[1px] border-white/80" />
                          )}
                          <span className={isValid ? 'text-white ' : 'text-white/70'}>
                            {conditionText}
                          </span>
                        </div>
                      );
                    })}
                  </div>


                <button
                  type="submit"
                  // disabled={isFormValid || loading}
                  className={`h-[52px] mt-1 flex items-center justify-center overflow-hidden duration-200 ease-in-out border-[.5px] rounded-full font-bold ${
                    !isFormValid || loading 
                      ? 'bg-main/15 text-white/30 border-main/15 cursor-not-allowed' 
                      : 'bg-white text-main2 border-white/50 cursor-pointer'
                  }`}
                >
                  {loading ? <Svg/> : "Continue"}
                </button>

                <p className="text-main font-InterTight tracking-wide text-center text-[11px] pt-2 opacity-90">
                  By creating an account you agree with our{' '}
                  <span className="underline">Terms of Service</span>,{' '}
                  <span className="underline">Privacy Policy</span>, and our default{' '}
                  <span className="underline">Notification Settings</span>.
                </p>
                
                <p className='w-full rounded-[11px] fixed bottom-4 right-12 text-right text-white text-[13.5px] pt-2'>
                  Already have an account?<Link className='underline text-green-500 opacity-100 font-bold' href={'/Auth/Login'}> Log in here.</Link>
                </p>
              </div>
            </>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default Form;



// shadow-xl bg-gradient-to-r backdrop-blur-2xl from-[#000]/10 via-black/0 to-[#000]/10