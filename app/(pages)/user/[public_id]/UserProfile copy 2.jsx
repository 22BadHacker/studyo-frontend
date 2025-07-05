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
import Follows from '../../../../Component/Follows';
import { useAudio } from '@/context/AudioProvider'
import { useAppHook } from '@/context/AppProvider';
import { RxDotsHorizontal } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { BsCopy } from 'react-icons/bs';
import CopyLinkButton from '@/Component/CopyLinkButton';
import Link from 'next/link';
import UploadProfileImageButton from '../../artist/[public_id]/ImageUpdate';
import UploadProfileImageButton2 from '../../artist/[public_id]/ImageUpdate2';
import EditModel from '@/Component/EditModel';
import ImageUpdate from './ImageUpdate';
import FollowedArtists from './FollowedArtists';
import FollowButton from '@/SmallComponent/FollowButton';


export default function UserProfile() {
  const { public_id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false);
  const { playTrack } = useAudio();
  const [showDropdown, setShowDropdown] = useState(false);

   const { user: currentUser } = useAppHook();
    
    const isOwner = currentUser?.public_id === user?.public_id;

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setShow(true);
      } else {
        // scrolling up
        setShow(false);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);


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


// useEffect(() => {
//   if (user) {
//     const isFollowing = user.followers.find(follower => follower._id === public_id);
//     setIsFollowing(!!isFollowing);
//   }
// }, [user, public_id]);





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
  })


  
  if (loading) return <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;


  

  return (
    <>  

       <AnimatePresence>
            {show && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{  opacity: 1 }}
                exit={{  opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed bottom-6 left-0  right-0 mx-auto w-[405px] rounded-full z-40 bg-black/80 border-[.5px]  backdrop-blur-md border-b border-white/10"
              >
                <div className="max-w-7xl mx-auto p-[7.5px] pr-4 flex items-center justify-between">
                  <div className="text-white flex items-center font-NeueMontreal tracking-[0.01em] gap-3 text-[16px] font-semibold capitalize">
                    {
                      user?.profile_image ? (
                      <img
                          src={`http://localhost:8000${user.profile_image}`}
                          // alt={user.username}
                          onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/Hand.jpeg'; // fallback image in /public
                        }}
                        
                        
                          className="rounded-full size-[45px] object-cover"
                      />
                      ) : (
                      <div className="size-[45px] flex items-center justify-center rounded-full bg-gray-400 text-white text-md font-bold">
                          {user.username.charAt(0).toUpperCase()}
                      </div>
                      )
                    }
                    <div className="flex flex-col leading-snug">
                        {user?.username}
                        <span className='text-[11px] font-normal text-white/70'>@{user?.username}</span>

                    </div>
                </div>

                  <FollowButton artistProfileImg={user.profile_image} artistName={user.username} artistId={user.id}/>
                    
                </div>
              </motion.nav>
            )}
        </AnimatePresence>


     <div className='w-full group h-[510px] absolute top-0 left-0 overflow-hidden' >
          <div className="w-full  z-[6] opacity-95  bg-gradient-to-b from-transparent via-[#000000]/15 to-[#000000]/100 absolute top-0 left-0 h-full" />
          <div className="w-full  z-[6] bg-gradient-to-l from-transparent via-[#000000]/0 to-[#000000]/90 absolute top-0 left-0 h-full" />
          <div className="w-full  z-[6] bg-gradient-to-r from-transparent via-[#0f0f0f]/0 to-[#000000]/85 absolute top-0 left-0 h-full" />
          
          <div className={`absolute overflow-hidden grid grid-cols-[.8fr_1fr_.8fr] top-0 left-0 right-0 w-full h-full `}>
              {user?.profile_image ? (
                <>
                {
                  [...Array(3)].map((_, index) => (
                    <div key={index} className={`w-full z-[1]  profileImg   first:grayscale-[100%]  last:grayscale-[100%] overflow-hidden  h-full`}>
                      
                      <img
                        
                      alt={user.username}
                      src={`http://localhost:8000${user.profile_image}`}
                        // alt={user.username}
                        onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/Hand.jpeg';
                      }}
                      
                        className={`object-cover size-full p saturate-[1.3]  object-center `}
                      />


                      
                    </div>
                  ))
                }
                  
                </>
                  ) : (
                    [...Array(3)].map((_, index) => (
                    <div key={index}  className='w-full z-[1]  first:grayscale-[100%] last:grayscale-[100%] overflow-hidden  h-full'>
                      
                      <img
                        
                        src={'/Hand.jpeg'}
                        alt={user.username}
                      
                        className="size-full p saturate-[1.5]  object-cover"
                      />
                    </div>
                    ))
                  )}
          </div>
     
      </div>
     
                 


        <div className="items-end  z-[10] pt-[210px] relative flex justify-between gap-4 w-full">

            <div className="flex  flex-col gap-2">
              {/* <p className='flex text-[17px] items-center  gap-2'>{isOwner ? 'Your Profile' : 'Profile'} {user.id === 123 && '(Admin)'}</p> */}
              <p className='flex  text-white/85 tracking-[0.022em] text-[14px] font-NeueMontreal font-medium items-center  gap-[6px]'>
                  {user.id === 123 && <img className='inline-flex ml-[.5px] mb-[.5px] w-[26px]' src="/check.png" alt="" />}
                  
                  Profile
                </p>
              <h1 className="text-[90px] capitalize leading-[1.1]  font-NeueMontreal  text-white text-shadow-2xs text-shadow-neutral-100  flex gap-3 items-center  font-bold">{user.username}</h1>
            </div>

            <div className="flex relative items-center gap-4">
      
                  {/* {
                    isOwner ? <UploadProfileImageButton /> : <UploadProfileImageButton2 />
                  } */}
                  {
                    isOwner && ( <>
                      <ImageUpdate /> 
                      {/* <EditModel /> */}
                    </>
                    )
                  }
                  <CopyLinkButton role={user.role} publicId={user.public_id} />
                  
      
                </div>

        </div>


       



        <div className="pt-[100px] flex flex-col gap-4 w-full">
            <div className="flex w-full items-center justify-between">
                  {/* <h1 className='text-[20px] text-white font-semibold'>Top Albums</h1> */}
                  
            </div>
        </div>

        <FollowedArtists public_id={user.public_id} userId={user.id} />







        
    </>
   
  );
}

