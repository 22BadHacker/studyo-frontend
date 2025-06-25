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
import Follows from '../../../../Component/Follows';
import { useAudio } from '@/context/AudioProvider'
import { useAppHook } from '@/context/AppProvider';
import { PiDotsThreeBold } from "react-icons/pi";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoPlaySharp } from "react-icons/io5";


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
import Tracks from './Track';
import RelatedArtist from './RelatedArtist';
import FollowButton from '@/SmallComponent/FollowButton';
import Playlist from '@/SmallComponent/Playlist';

export default function UserProfile() {
  const { public_id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { playTrack } = useAudio();
  const { user: currentUser, authToken } = useAppHook();
  
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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${public_id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true
        })
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
    <div >  

      {/* Sticky Profile */}
       <AnimatePresence>
            {show && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{  opacity: 1 }}
              exit={{  opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-6 left-0  right-0 mx-auto w-[405px] rounded-full z-40 bg-black/80 border-[.5px]  backdrop-blur-md border-b border-white/10"
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
                      <div className="flex gap-[2px] items-center">
                        {user?.username}
                        <img className='inline-flex ml-[.5px] relative top-[1px] w-[15px]' src="/check.png" alt="" />
                      </div>

                        <span className='text-[11px] font-normal text-white/70'>@{user?.username}</span>

                    </div>
                </div>
                  
                  <FollowButton artistProfileImg={user.profile_image} artistName={user.username} artistId={user.id}/>
                
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
                    
        <div  className="items-end  z-[40] pt-[210px] relative flex justify-between gap-3 w-full">
          
          <div className="flex w-fit   flex-col gap-2">
            <p className='flex  text-white/90 text-[15px] font-Oswald font-medium items-center  gap-2'>
            {/* <PiSealCheckFill className='text-[#4cb3ff] mb-[.25px] text-[26px]' /> */}
            <img className='inline-flex ml-[.5px] mb-[.5px] w-[26.5px]' src="/check.png" alt="" />
            Verified Artist 
            </p>
            <h1 className="text-[87px] capitalize leading-[1.1]  font-NeueMontreal  text-white text-shadow-2xs text-shadow-neutral-100  flex gap-3 items-center  font-bold">{user.username} </h1>
          </div>
          
          <div className="flex  relative items-center gap-4">

            {
              isOwner ? <UploadProfileImageButton /> : <UploadProfileImageButton2 />
            }
            <CopyLinkButton role={user.role} publicId={user.public_id} />
            

          </div>
         

        </div>



        <div className="min-h-screen relative  flex-col pt-[50px] w-full flex gap-4 ">
          
                <div className="flex gap-4 items-center">
                    <p className='font-NeueMontreal bg-main  px-7 py-[10px] rounded-full text-main2 text-[13px]'>All</p>
                    <p className='profile_btn'>Biography</p>
                    <p className='profile_btn'>Albums</p>
                    <p className='profile_btn'>Tracks</p>

                </div>

              
              <Tracks owner={isOwner}/>
             
                
                {user?.albums.length > 0 && (
                  
                  <Albums />
                )}

                {/* <iframe style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/album/33pt9HBdGlAbRGBHQgsZsU?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
                  


                {
                  user?.bio && (
                  

                      <div className=" flex flex-col gap-6 pt-11">
                          <h1 className='text-2xl flex items-end leading-tight gap-2 text-white font-NeueMontreal font-semibold'> Biography <span className='text-[14px] text-white/70 relative top-[0px] font-medium'></span></h1>

                          <div className="w-[720px] h-[490px] overflow-hidden rounded-md relative">
                              <img className='size-full object-top object-cover' src={`http://localhost:8000${user.profile_image}`} alt="" />
                              
                              <div className="w-full    opacity-95  bg-gradient-to-b from-black/60 via-transparent to-[#000000]/95 absolute top-0 left-0 h-full" />
                              <div className="absolute p-4 font-Oswald  tracking-wide font-medium leading-[1.4]   text-white/90 text-justify  capitalize text-[14px] w-full h-full top-0 left-0 flex flex-col items-start gap-2 justify-end">
                                  <div className="flex absolute top-3  items-center gap-2"><img className='size-[53px] shadow-2xl bg-[#c42b1c] p-[1px] rounded-full object-top object-cover' src={`http://localhost:8000${user.profile_image}`} alt="" /> 
                                    <div className="flex flex-col leading-tight"><p className='text-[17px] font-NeueMontreal font-bold'>{user.username}</p> <h6 className='text-[12.5px] font-NeueMontreal text-white/50]'>Artist</h6></div>
                                  </div>
                                  {user.bio}
                              </div>
                          </div>


                      </div>
                  )
                }


                <div className="flex pt-11 flex-col gap-3">
                    <h1 className='text-2xl flex items-end leading-tight gap-2 text-white font-NeueMontreal font-semibold'> Artist Playlist</h1>
                    <Playlist />
                </div>

                <RelatedArtist />







        </div>


        
    </div>
   
  );
}

        