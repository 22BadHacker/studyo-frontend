'use client'
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/Logo/Studyo_white.svg';
import { useAppHook } from '@/context/AppProvider';
import { useRouter } from 'next/navigation';
import { IoChevronDown } from "react-icons/io5";

const Nav = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authToken} = useAppHook();
    const router = useRouter();

     useEffect(() => {
        if (!authToken) return router.push('/Auth/Login');
    
        axios.get('http://localhost:8000/api/user/profile', {
          headers: { Authorization: `Bearer ${authToken}` },
        })
          .then(res => {
            setUser(res.data);
            
            setLoading(false);
    
           
          })
          .catch(() => router.push('/Auth/Login'));
      }, []);

       if (loading) return <div className='h-screen w-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;

  return (
    <>
      <div className="flex  px-12 py-6  items-center  justify-between w-full mx-auto">

          <Link className='z-[70] group relative inline-block overflow-hidden  h-[47px] ' href={'/'}>
                <Image alt='Logo' className='w-[115px] block transition-transform duration-300 group-hover:-translate-y-full h-full' src={logo} width={120} height={120}/>
                <Image alt='Logo' className='w-[115px] absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full h-full' src={logo} width={120} height={120}/>
            </Link>
        <div className="flex gap-5 items-center">

        <div className="size-[48px] shadow-md bg-[#222222] rounded-full flex-center">
            {
                user?.profile_image ?  <img className='size-[42px] rounded-full saturate-[1.3]  object-cover' src={`http://localhost:8000${user.profile_image}`} onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/Hand.jpg'; // fallback image in /public
            }} alt="" />
                    : <span className='size-[42px] bg-white text-black rounded-full flex-center font-bold  text-[16px]'>{user.username.charAt(0).toUpperCase()}</span>
                
            }

        </div>
          <p className="text-white flex gap-2 items-center text-[16px] font-semibold">Profile <IoChevronDown size={12}/></p> 

        </div>
      </div>
    </>
  )
}

export default Nav
