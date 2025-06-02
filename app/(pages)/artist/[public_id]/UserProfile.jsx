'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Svg from '@/Component/Svg';
import { PiSealCheckThin } from "react-icons/pi";
import { TbDots } from "react-icons/tb";
import { FaPlay } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdPlay } from "react-icons/io";
import api from '@/lib/axios';
import Follows from '../../Account/[public_id]/Follows';
import { useAudio } from '@/context/AudioProvider'
import { useAppHook } from '@/context/AppProvider';
import { PiSealCheckFill } from "react-icons/pi";
import { RxDotsHorizontal } from 'react-icons/rx';
import { RiHeartAddFill } from "react-icons/ri";
import { BsCopy } from 'react-icons/bs';
import CopyLinkButton from '@/Component/CopyLinkButton';


export default function UserProfile() {
  const { public_id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { playTrack } = useAudio();
  const { user: currentUser } = useAppHook();

  const isOwner = currentUser?.public_id === user?.public_id;

  
  const [showSticky, setShowSticky] = useState(false);


  useEffect(() => {
  const container = document.getElementById('scroll-container');
  const handleScroll = () => {
    if (container) {
      setShowSticky(container.scrollTop > 450);
    }
  };

  container?.addEventListener('scroll', handleScroll);
  return () => container?.removeEventListener('scroll', handleScroll);
}, []);


useEffect(() => {
      const handleClickOutside = (e) => {
        if (!e.target.closest(".drop")) {
          setShowDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);





     useEffect(() => {
    // Delay fetch by 5 seconds
    const timer = setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${public_id}`)
        .then(res => res.json())
        .then(data => {
          setUser(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to fetch artists:', err)
          setLoading(false)
        })
    }, 1000)

    return () => clearTimeout(timer)
  }, [public_id])


  
  if (loading) return <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;


  

  return (
    <>  

       <AnimatePresence>
            {showSticky && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{  opacity: 1 }}
                exit={{  opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed bottom-7 left-0  right-0 mx-auto w-[415px] rounded-full z-40 bg-black/80 border-[.5px]  backdrop-blur-md border-b border-white/10"
              >
                <div className="max-w-7xl mx-auto p-[7px] flex items-center justify-between">
                  <div className="text-white flex items-center gap-3 text-lg font-semibold capitalize">{
                      user.profile_image ? (
                      <img
                          src={'/images/img10.jpg'}
                          alt={user.username}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                      />
                      ) : (
                      <div className="size-11 flex items-center justify-center rounded-full bg-gray-400 text-white text-md font-bold">
                          {user.username.charAt(0).toUpperCase()}
                      </div>
                      )
                    }{user?.username}</div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => setIsFollowing(prev => !prev)}
                      className="relative cursor-pointer px-5 py-[10px] rounded-full border border-white/20 overflow-hidden text-white text-sm font-medium"
                      initial={false}
                      animate={{ backgroundColor: isFollowing ? '#ffffff' : 'transparent', color: isFollowing ? '#000' : '#fff' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <motion.span
                        key={isFollowing ? 'unfollow' : 'follow'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </motion.span>
                    </motion.button>
                    {/* <Follow /> */}
                    
                  </div>
                </div>
              </motion.nav>
            )}
        </AnimatePresence>


      <div className="">
            <div className="w-full  z-[6] bg-gradient-to-b from-transparent via-[#000000]/10 to-[#000000]/100 absolute top-0 left-0 h-[500px]" />
            <div className="w-full  z-[6] bg-gradient-to-l from-transparent via-[#000000]/10 to-[#000000]/100 absolute top-0 left-0 h-[500px]" />
            <div className="w-full  z-[6] bg-gradient-to-r from-transparent via-[#0f0f0f]/10 to-[#000000]/100 absolute top-0 left-0 h-[500px]" />
            
            <div className="absolute   overflow-hidden grid grid-cols-3 top-0 left-0 right-0 w-full h-auto ">
                 {user.profile_image ? (
                  <>
                  {
                    [...Array(3)].map((_, index) => (
                      <div className='w-full z-[1]  first:grayscale-[100%] last:grayscale-[100%] overflow-hidden  h-[500px]'>
                        
                        <img
                          key={index}
                          src={'/bad.avif'}
                          alt={user.username}
                        
                          className="size-full p saturate-[1.3]  object-cover"
                        />
                      </div>
                    ))
                  }
                    
                  </>
                    ) : (
                      [...Array(3)].map((_, index) => (
                      <div className='w-full z-[1]  first:grayscale-[100%] last:grayscale-[100%] overflow-hidden  h-[500px]'>
                        
                        <img
                          key={index}
                          src={'/selena.jpeg'}
                          alt={user.username}
                        
                          className="size-full p saturate-[1.5]  object-cover"
                        />
                      </div>
                    ))
                    )}
            </div>
      </div>

        <div className="items-end  z-[10] pt-[200px] relative flex justify-between gap-4 w-full">
          <div className="flex  flex-col gap-2">
            <p className='flex upp font-medium items-center  gap-2'>
            <PiSealCheckFill className='text-[#4cb3ff] mb-[.25px] text-[28px]' />
            Verified Artist
            </p>
            <h1 className="text-7xl uppercase font-NeueMontreal text-white  flex gap-3 items-center  font-bold">{user.username}</h1>
          </div>
         <div className="flex items-center gap-4">
            <button
              onClick={() =>
                playTrack({
                  id: 1,
                  title: 'Tití me preguntó',
                  artist: 'Bad Bunny',
                  cover: '/titi.jpg',
                  src: '/Bad.mp3',
                })
              }
              className="size-[42px] flex-center border-green-500 bg-green-500 rounded-full text-[#000] text-[15px]"
            >
              <IoMdPlay />
            </button>

            {!isOwner ? (
              <>
                <motion.button
                  onClick={() => setIsFollowing(prev => !prev)}
                  className="relative cursor-pointer px-6 py-2 rounded-full border border-white/20 overflow-hidden text-white text-sm font-medium"
                  initial={false}
                  animate={{
                    backgroundColor: isFollowing ? '#ffffff' : 'transparent',
                    color: isFollowing ? '#000' : '#fff',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.span
                    key={isFollowing ? 'unfollow' : 'follow'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </motion.span>
                </motion.button>

                <div className="flex drop h-fit relative items-center gap-4">
                  <button onClick={() => setShowDropdown(!showDropdown)} className="flex cursor-pointer relative">
                    <RxDotsHorizontal className="text-[27px]" />
                  </button>

                  {showDropdown && (
                    <div className="absolute top-[55px] overflow-hidden right-0 bg-main2/70 rounded-md flex flex-col backdrop-blur-2xl w-[200px]">
                      <p className="px-3 py-3 cursor-pointer hover:bg-main2 flex gap-4 text-[14.5px] items-center">
                        <RiHeartAddFill size={18} />
                        Follow
                      </p>
                      <button className="px-3 cursor-pointer py-3 hover:bg-main2 flex gap-4 text-[14.5px] items-center">
                        <BsCopy />
                        <CopyLinkButton role={user.role} publicId={user.public_id} />
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button className="px-6 py-2 text-sm font-medium rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition">
                Edit Profile
              </button>
            )}
          </div>




       

        </div>


        <div className="pt-[100px] flex flex-col gap-4 w-full">
            <div className="flex w-full items-center justify-between">
                  {/* <h1 className='text-[20px] text-white font-semibold'>Top Albums</h1> */}
                  
            </div>
        </div>







        
    </>
   
  );
}
