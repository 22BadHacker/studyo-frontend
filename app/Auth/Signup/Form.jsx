'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/Logo/Studyo_white.svg';
import google from '@/public/Logo/google.svg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Form = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  
    // Email Pattern
  const isValidEmail = /^\S+@\S+\.\S+$/.test(formData.email);

    // Form  Validation 
  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.password.length >= 6 &&
    isValidEmail;

    // Handle Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email' && (value === '' || isValidEmail)) {
      setTouched(false);
    }
  };

    //   Handle Blur
  const handleBlur = (e) => {
    if (e.target.name === 'email') setTouched(true);
  };

    //   Handle Password Visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full h-full p-6 bg-black/40 z-[10]">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <Image
            alt="Logo"
            className="w-[120px] fixed top-7 left-9"
            src={Logo}
            width={140}
            height={140}
          />
        </Link>
        <p className="fixed top-7 right-9 text-white text-[15px] opacity-85">
          Already have an account?
          <Link href="/Auth/Login" className="underline font-bold opacity-100">
            {' '}
            Log in here.
          </Link>
        </p>
      </div>

      {/* Form Steps */}
      <div className="w-full h-full flex justify-center gap-10 flex-col items-center">
        <form className="flex flex-col px-7 items-center rounded-xl bg-black/60 backdrop-blur-[10px] py-8 h-[640px] w-[520px]">
          {step === 1 && (
            <>
              <h1 className="text-white pt-3 font-bold text-center leading-[1.2] text-[32px] max-w-[480px]">
                Create Your Free Account & Start Listening.
              </h1>
              <div className="flex w-full max-w-[90%] flex-col gap-10 pt-20">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex gap-3 hover:border-white duration-200 h-[52px] w-full items-center justify-center border-white/50 border-[0.5px] rounded-full"
                >
                  <Image alt="Google" src={google} className="w-[20px]" />
                  <span className="text-white font-semibold">Sign up with Google</span>
                </button>

                <div className="grid pt-1 items-center grid-cols-[1fr_auto_1fr] gap-3">
                  <div className="w-full border-b-white/50 border-b-[.5px]" />
                  <p className="text-white/80 font-bold text-[14px]">OR</p>
                  <div className="w-full border-b-white/50 border-b-[.5px]" />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-white text-[14px] font-medium">
                    Your email
                  </label>
                    <input
                      name="email"
                      value={formData.email}
                      type="email"
                      placeholder="you@example.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 px-4 py-3 placeholder:text-white/50 text-white bg-transparent border-[0.5px] rounded-full outline-none ${
                        !isValidEmail && touched
                          ? 'border-red-500'
                          : 'border-white/70 hover:border-white'
                      }`}
                    />
                  {!isValidEmail && touched && (
                    <p className="text-red-500 text-[13px] font-medium">
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

                  <p className="text-main text-center text-[11px] pt-5 opacity-90">
                    By creating an account you agree with our{' '}
                    <span className="underline">Terms of Service</span>,{' '}
                    <span className="underline">Privacy Policy</span>, and our default{' '}
                    <span className="underline">Notification Settings</span>.
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="absolute cursor-pointer left-7 top-5 text-green-500 text-[14px] border-b"
              >
                Back
              </button>
              <div className="text-center">
                <h1 className="text-white pt-10 font-bold text-[32px] leading-[1.2] max-w-[480px]">
                  Final details, we promise.
                </h1>
                <p className="text-main font-medium text-[14px]">
                  Pick the name others will see on your profile.
                </p>
              </div>

              <div className="w-full max-w-[90%] pt-[55px] flex flex-col gap-5">
                <div className="flex pb-1 flex-col gap-1">

                    <label className="text-white text-[14px] font-medium">
                    Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 text-white px-3 py-2 bg-transparent border-[0.5px] border-white/50 rounded-[12px] outline-none hover:border-white"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="text-white pb-1 text-[14px] font-medium">
                    First Name
                    <input
                    placeholder=''
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-2 text-white px-3 py-2 bg-transparent border-[0.5px] border-white/50 rounded-[12px]  outline-none hover:border-white"
                    />
                  </label>
                  <label className="text-white text-[14px] font-medium">
                    Last Name
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-2 text-white px-3 py-2 bg-transparent border-[0.5px] border-white/50 rounded-[12px] outline-none hover:border-white"
                    />
                  </label>
                </div>

                <label className="text-white text-[14px] font-medium">
                  Password
                  <div className="mt-2 flex items-center px-4 bg-transparent border-[0.5px]  border-white/50 hover:border-white rounded-[12px]">
                    <input
                    placeholder=''
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="flex-1 py-2 text-white bg-transparent outline-none border-none"
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
                  disabled={!isFormValid}
                  className={`h-[52px] mt-1  border-[.5px] rounded-full font-bold ${
                    !isFormValid
                      ? 'bg-main/15 text-white/30 border-main/15 cursor-not-allowed'
                      : 'bg-white text-main2 border-white/50 cursor-pointer'
                  }`}
                >
                  Continue
                </button>

                <p className="text-main text-center text-[11px] pt-3 opacity-90">
                  By creating an account you agree with our{' '}
                  <span className="underline">Terms of Service</span>,{' '}
                  <span className="underline">Privacy Policy</span>, and our default{' '}
                  <span className="underline">Notification Settings</span>.
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
