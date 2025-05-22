'use client'
import React, { useState } from 'react'
import Logo from '@/public/Logo/Studyo_white.svg'
import google from '@/public/Logo/google.svg'
import Image from 'next/image'
import Link from 'next/link'
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";

const Form = () => {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        email: "",
        firstName: "",
        lastName: ""
    });

    // form validation 
     const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.password.length >= 6 &&
    isValidEmail;

     const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Reset touched for email if it's being typed and valid
        if (name === "email" && (value === "" || isValidEmail)) {
        setTouched(false);
        } 
    };

    const handleChange2 = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle email blur (errors, valid email)
    const handleBlur = (e) => {
    if (e.target.name === "email") {
      setTouched(true);
    }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    };

    const isValidEmail = /^\S+@\S+\.\S+$/.test(formData.email);

  return (
    <div className='w-full h-full p-6  bg-black/40 z-[10] '>
        <div className=" w-full flex justify-between items-center">
            <Link href={'/'}>
                <Image alt='Logo' className='w-[120px] fixed bottom-7 left-[70px] ' src={Logo} width={140} height={140}/>
            </Link>
            <p className=' fixed bottom-7 right-9 text-white text-[15px] opacity-85'>Already have an account?<Link className='underline opacity-100 font-bold' href={'/Auth/Login'}> Log in here.</Link></p>

        </div>

        <div className="w-full h-full flex  pt-20 gap-10 flex-col items-center">
            <form  className="flex flex-col  px-7 items-center  rounded-xl bg-black/60 backdrop-blur-[10px] py-8 h-[640px] w-[520px]">
            {step === 1 &&(
                <>
                <h1 className='text-white pt-3 font  text-center font-[700]   leading-[1.2]  text-[32px] max-w-[480px]'>Create Your Free Account & Start Listening.</h1>
                <div className="flex w-full max-w-[90%] justify-center flex-col gap-10 pt-20">
                    <div onClick={nextStep}  className="flex gap-3 hover:border-white duration-200 ease-in-out h-[52px] w-full items-center  justify-center border-white/50 border-[.5px] rounded-full">
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
                            <label className='text-white text-[14px] font-Montserrat font-medium'>Your email</label>
                            <input onBlur={handleBlur} onChange={handleChange} name='email' value={formData.email} placeholder="you@example.com" type="email" className={`flex ${!isValidEmail && touched ? "border-red-500" : "border-white/70 hover:border-white"} px-4 outline-none  duration-200 ease-in-out placeholder:text-white/50 text-white gap-3 h-[52px] text-[15.5px] w-full items-center justify-center border-[.5px] rounded-full`} />
                            {!isValidEmail && touched && (
                            <p className="text-red-500 text-[13px] font-Montserrat font-medium">Please enter a valid email address.</p>
                            )}
                        </div>
                        
                        <button onClick={nextStep} disabled={!isValidEmail} className={`flex text-main2 ${!isValidEmail ? 'bg-main/15  text-white/30 border-main/15 cursor-not-allowed' : "bg-white text-main2 cursor-pointer border-white/50" }  font-bold gap-3  duration-200 ease-in-out  h-[52px] w-full  items-center justify-center  border-[.5px] rounded-full`}>Create Your Account</button>
                        <h5 className='text-main text-center opacity-90  text-[11px] pt-3'>By creating an account you agree with our <span className='underline '>Terms of Service </span>, <span className='underline '> Privacy Policy</span> , and our default <span className='underline '> Notification Settings</span>.</h5>
                        

                    </div>
                </div>
                </>

            )}


            {
                step === 2 && (
                    <>
                    <button onClick={prevStep} className=" cursor-pointer text-green-500 text-[14px] border-b-[1px] absolute left-7 top-5">Back</button>
                    <div className="flex text-center flex-col gap-1">
                        <h1 className='text-white pt-10 font  text-center font-[700]   leading-[1.2]  text-[32px] max-w-[480px]'>Final details, we promise.</h1>
                        <p className='text-main font-Montserrat text-[14px]'>Pick the name others will see on your profile.</p>                        
                    </div>

                    <div className="flex w-full max-w-[90%] justify-center pt-[55px]  flex-col gap-5">
                        {/* email container */}
                        <div className="flex flex-col gap-2">
                             <p className='text-white text-[14px] font-Montserrat font-medium'>Email</p>
                            <input value={formData.email} name='email'
                            onChange={handleChange2} type="text" className='text-white hover:border-white duration-200 ease-in-out h-[40px] w-full items-center  justify-center border-white/50 border-[.5px] rounded-[12px] px-3 text-[15px] outline-none' />
                        </div>

                        {/* First , Last name container */}
                        <div className="grid w-full grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                             <p className='text-white text-[14px] font-Montserrat font-medium'>First Name</p>
                            <input value={formData.firstName} name='text'
                            onChange={handleChange2} type="text"  className='text-white hover:border-white duration-200 ease-in-out h-[40px] w-full items-center  justify-center border-white/50 border-[.5px] rounded-[12px] px-3 text-[15px] outline-none' />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className='text-white text-[14px] font-Montserrat font-medium'>Last Name</p>
                                <input value={formData.lastName} name='text'
                            onChange={handleChange2}  type="text"  className='text-white hover:border-white duration-200 ease-in-out h-[40px] w-full items-center  justify-center border-white/50 border-[.5px] rounded-[12px] px-3 text-[15px] outline-none' />
                            </div>
                        </div>
                        {/* Password container */}
                        <div className="flex flex-col gap-2">
                             <p className='text-white text-[14px] font-Montserrat font-medium'>Password</p>
                             <div className="grid grid-cols-[1fr_auto]  px-4 outline-none hover:border-white duration-200 ease-in-out placeholder:text-white/50 text-white gap-[10px] h-[40px] text-[15.5px] w-full items-center justify-center border-white/70 border-[.5px] rounded-[12px]">
                            <input  name="password"
                            value={formData.password}
                            onChange={handleChange2}  type={showPassword ? "text" : "password"} className='outline-none border-none w-full' />
                            <button type="button"  className='cursor-pointer text-[17px]' onClick={togglePasswordVisibility}>{showPassword ? <BsEye /> : <BsEyeSlash />}</button>
                        </div>
                        </div>

                        <button type="button" disabled={!isFormValid} className={`flex text-main2 ${!isFormValid ? 'bg-main/15  text-white/30 border-main/15 cursor-not-allowed' : "bg-white text-main2 cursor-pointer border-white/50" }  font-bold gap-3  duration-200 ease-in-out  h-[52px] w-full  items-center justify-center  border-[.5px] rounded-full`}>Create Your Account</button>
                        <h5 className='text-main text-center opacity-90  text-[11px] pt-3'>By creating an account you agree with our <span className='underline '>Terms of Service </span>, <span className='underline '> Privacy Policy</span> , and our default <span className='underline '> Notification Settings</span>.</h5>



                    </div>

                    </>
                )
            }

            </form>

        </div>
            
    </div>
  )
}

export default Form



// Your Music, Your Way
// Ready to Discover & Create? Let’s Go!