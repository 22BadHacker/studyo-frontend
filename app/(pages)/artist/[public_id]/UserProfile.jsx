'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Svg from '@/Component/Svg';
import { PiSealCheckFill, PiSealCheckThin } from "react-icons/pi";
import { TbDots } from "react-icons/tb";
import { FaPlay } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdPlay } from "react-icons/io";
import api from '@/lib/axios';
import Follows from '../../Account/[public_id]/Follows';
import { useAudio } from '@/context/AudioProvider'
import { useAppHook } from '@/context/AppProvider';
import { PiDotsThreeBold } from "react-icons/pi";
import { RiCloseLargeLine } from "react-icons/ri";


import CopyLinkButton from '@/Component/CopyLinkButton';
// import EditModel from '@/Component/EditModel';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
// import UploadProfileImageButton from './ImageUpdate';
import Link from 'next/link';
import { IoMdShare } from "react-icons/io";
import { PiDotsNineBold } from "react-icons/pi";
import { IoAddSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { PiCopySimpleLight } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";
import { PiDotsNineLight } from "react-icons/pi";
import EditModel from '@/Component/EditModel';
import UploadProfileImageButton from './ImageUpdate';
import UploadProfileImageButton2 from './ImageUpdate2';
import Follow from './Follow';
import { getUserImageClasses } from '@/Data/data';
import Track from './Track';
import Albums from './Albums';
import ArtistAlbums from './Albums';

export default function UserProfile() {
  const { public_id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { playTrack } = useAudio();
  const { user: currentUser } = useAppHook();
  
  const isOwner = currentUser?.public_id === user?.public_id;
  
  const artistId = user?.public_id;




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
    <div >  

      {/* Sticky Profile */}
       <AnimatePresence>
            {show && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{  opacity: 1 }}
              exit={{  opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-7 left-0  right-0 mx-auto w-[405px] rounded-full z-40 bg-black/80 border-[.5px]  backdrop-blur-md border-b border-white/10"
            >
              <div className="max-w-7xl mx-auto p-[7.5px] flex items-center justify-between">
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
                        
                        
                          className={`rounded-full ${user.id === 14 && 'object-top'}  size-[45px] object-cover`}
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
                  
                </div>
              </div>
            </motion.nav>
          )}
      </AnimatePresence>
    
          {/*Profile Container  */}
      <div className='w-full group h-[510px] absolute top-0 left-0 overflow-hidden' >
            <div className="w-full  z-[6] opacity-95  bg-gradient-to-b from-transparent via-[#000000]/15 to-[#000000]/100 absolute top-0 left-0 h-full" />
            <div className="w-full  z-[6] bg-gradient-to-l from-transparent via-[#000000]/0 to-[#000000]/90 absolute top-0 left-0 h-full" />
            <div className="w-full  z-[6] bg-gradient-to-r from-transparent via-[#0f0f0f]/0 to-[#000000]/85 absolute top-0 left-0 h-full" />
            
            <div className={`absolute ${user.id === 19 && 'grid-cols-[.8fr_1.2fr_.8fr]'} ${user.id === 14 && 'grid-cols-[.8fr_1.2fr_.8fr]'}   overflow-hidden grid grid-cols-[.8fr_1fr_.8fr] top-0 left-0 right-0 w-full h-full `}>
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
                        
                          className={getUserImageClasses(user.id)}
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

        {/* Info + username */}
                    
        <div  className="items-end  z-[30] pt-[210px] relative flex justify-between gap-4 w-full">
          
          <div className="flex w-fit   flex-col gap-2">
            <p className='flex  text-[#4cb3ff] text-[14.5px] font-NeueMontreal font-medium items-center  gap-2'>
            <PiSealCheckFill className='text-[#4cb3ff] mb-[.25px] text-[26px]' />
            Verified Artist
            </p>
            <h1 className="text-[87px] capitalize leading-[1.1]  font-NeueMontreal text-white text-shadow-2xs text-shadow-neutral-100  flex gap-3 items-center  font-bold">{user.username} </h1>
          </div>
          
          <div className="flex relative items-center gap-4">

            {
              isOwner ? <UploadProfileImageButton /> : <UploadProfileImageButton2 />
            }
            <CopyLinkButton role={user.role} publicId={user.public_id} />
            

          </div>
         

        </div>



        <div className="min-h-screen relative z-[20] flex-col pt-[50px] w-full flex gap-4 ">
          
                <div className="flex gap-4 items-center">
                    <p className='font-NeueMontreal bg-main2 px-7 py-[10px] rounded-full text-white text-[15.5px]'>All</p>
                    <p className='profile_btn'>Biography</p>
                    <p className='profile_btn'>Albums</p>
                    <p className='profile_btn'>Tracks</p>

                </div>


              <Track/>

              {/* <Albums artistId={user?.id} /> */}


               {/* <h2>Albums</h2>
                  {user.albums.length > 0 ? (
                    <ul>
                      {user.albums.map(album => (
                        <li key={album.id}>
                          <h3>{album.title}</h3>
                
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No albums found</p>
                  )} */}
                
                {user?.albums.length > 0 && (
                  
                  <Albums />
                )}
                  


                {/* {
                  user?.bio && (
                  

                      <div className=" flex flex-col gap-6 pt-11">
                          <h1 className='text-2xl flex items-end leading-tight gap-2 text-white font-NeueMontreal font-semibold'> Biography <span className='text-[14px] text-white/70 relative top-[0px] font-medium'>{user.username}</span></h1>

                          <div className="w-[720px] h-[490px] overflow-hidden rounded-md relative">
                              <img className='size-full object-top object-cover' src={`http://localhost:8000${user.profile_image}`} alt="" />
                              
                              <div className="w-full    opacity-95  bg-gradient-to-b from-transparent via-[#000000]/15 to-[#000000]/95 absolute top-0 left-0 h-full" />
                              <div className="absolute p-6 font-NeueMontreal tracking-wide font-medium leading-[1.42]   text-white/80 text-justify capitalize text-[15px] w-full h-full top-0 left-0 flex items-end justify-end">
                                  {user.bio}
                              </div>
                          </div>


                      </div>
                  )
                } */}




        </div>


        
    </div>
   
  );
}

        