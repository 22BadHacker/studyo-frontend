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
// import EditProfileForm from '@/Component/EditProfileForm';
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


export default function UserProfile() {
  const { public_id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { playTrack } = useAudio();
  const { user: currentUser } = useAppHook();
  const isOwner = currentUser?.public_id === user?.public_id;




   const [username, setUsername] = useState('');
  const fileInputRef = useRef();
    const [profileImage, setProfileImage] = useState(null); // ✅ Fix here
    const [loading, setLoading] = useState(false);
     const [open, setOpen] = useState(false);


    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfileImage(file);
      }
    };
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData();
        formData.append('username', username);
        // formData.append('email', email);
        if (profileImage) {
          formData.append('profile_image', profileImage); // 
        }
        
    
        try {
          await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true
          });
          await axios.post('http://localhost:8000/api/profile/update', formData, {
          // withCredentials: true
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`
          }
        });
    
          toast.success('Profile updated!');
        } catch (error) {
          console.error(error);
          toast.error('Failed to update profile');
        } finally {
          setLoading(false);
        }
      };

  





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
    
          {/*Profile Container  */}
      <div >
            <div className="w-full  z-[6] opacity-95  bg-gradient-to-b from-transparent via-[#000000]/15 to-[#000000]/100 absolute top-0 left-0 h-[500px]" />
            <div className="w-full  z-[6] bg-gradient-to-l from-transparent via-[#000000]/0 to-[#000000]/95 absolute top-0 left-0 h-[500px]" />
            <div className="w-full  z-[6] bg-gradient-to-r from-transparent via-[#0f0f0f]/0 to-[#000000]/80 absolute top-0 left-0 h-[500px]" />
            
            <div className="absolute   overflow-hidden grid grid-cols-3 top-0 left-0 right-0 w-full h-auto ">
                 {user?.profile_image ? (
                  <>
                  {
                    [...Array(3)].map((_, index) => (
                      <div key={index} className='w-full z-[1] profileImg  first:grayscale-[100%]  last:grayscale-[100%] overflow-hidden  h-[500px]'>
                        
                        <img
                          
                        alt={user.username}
                         src={`http://localhost:8000${user.profile_image}`}
                          // alt={user.username}
                          onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/Hand.jpeg'; // fallback image in /public
                        }}
                        
                          className="size-full p saturate-[1.3]  object-cover"
                        />
                      </div>
                    ))
                  }
                    
                  </>
                    ) : (
                      [...Array(3)].map((_, index) => (
                      <div key={index}  className='w-full z-[1]  first:grayscale-[100%] last:grayscale-[100%] overflow-hidden  h-[500px]'>
                        
                        <img
                          
                          src={'/selena.jpeg'}
                          alt={user.username}
                        
                          className="size-full p saturate-[1.5]  object-cover"
                        />
                      </div>
                    ))
                    )}
            </div>
      </div>

        {/* Info + username */}
                    
        <div  className="items-end  z-[10] pt-[200px] relative flex justify-between gap-4 w-full">
          
          <div className="flex w-fit   flex-col gap-2">
            <p className='flex  text-[#4cb3ff] text-[14.5px] font-NeueMontreal font-medium items-center  gap-2'>
            <PiSealCheckFill className='text-[#4cb3ff] mb-[.25px] text-[26px]' />
            Verified Artist
            </p>
            <h1 className="text-[87px] leading-[1.1]  font-NeueMontreal text-white  flex gap-3 items-center  font-bold">{user.username}</h1>
          </div>


         

        </div>

        <div className="h-screen relative z-[20] flex-col pt-[50px] w-full flex gap-4 ">
          
            <div className="flex w-full justify-between  items-center gap-4">

                {/* Three Btns */}
                <div className="flex relative items-center gap-7">
                  {!isOwner ? (
                    <>
                      <button  className="size-[46px] group relative  flex-center  bg-green-500 rounded-full text-[#222222] text-[18px]">
                        <IoMdPlay />
                        <span className='text-[12px] group-hover:opacity-100 opacity-0 rounded absolute top-[57px] font-semibold duration-200 ease-in-out  text-white/80 bg-main2 px-[10px] py-[4px]'>Play</span>
                      </button>
                      <motion.button
                        onClick={() => setIsFollowing(prev => !prev)}
                        className="relative  bg-main2/95 cursor-pointer px-[26px] py-[14px] rounded-full overflow-hidden text-white text-sm font-medium"
                        initial={false}
                        animate={{
                          backgroundColor: isFollowing ? '#ffffff' : '',
                          color: isFollowing ? '#000' : '#fff',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <motion.span
                          key={isFollowing ? 'Following' : 'follow'}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </motion.span>
                      </motion.button>

                      {/* <button className='relative group flex-center hover:text-white duration-200 ease-in-out  rounded-full text-white/80 cursor-pointer text-[19px]'><IoMdShare/> <span className='text-[12px] group-hover:opacity-100 opacity-0 rounded absolute top-[34px] font-semibold duration-200 ease-in-out  text-white/80 bg-main2 px-[10px] py-[4px]'>Share</span></button> */}
                      <CopyLinkButton role={user.role} publicId={user.public_id} />

                      
                    </>
                  ) : (
                    <>
 

                      <span className='flex font-NeueMontreal bg-main2 py-[11px] px-[18px] rounded-full gap-[10px] items-center'><IoAddSharp size={19}/>Create</span>
                      {/* <EditProfileForm /> */}
                       <button
                      onClick={() => setOpen(true)}
                      className="bg-main2/80 rounded-full text-white px-4 py-2 font-semibold hover:bg-main2/80"
                    >
                      Edit Profile
                    </button>

                      <button className='text-[26px] relative'><PiDotsNineLight size={30}/>
                          {/* <div className="absolute top-10 leading-tight text-white/80 font-NeueMontreal left-0 text-[13px] bg-main2/70 rounded-md flex flex-col backdrop-blur-2xl w-[190px]">
                              <div className="flex items-center gap-3 p-3">
                                  <FiEdit2 size={17}/>
                                  Edit your profile
                              </div>
                              <div className="flex items-center gap-3 p-3">
                                  <PiCopySimpleLight size={17}/>
                                  Copy your profile link 
                              </div>
                          </div> */}
                      </button>
                      


                    </>
                  )}
                </div>
            

               

                <div className="flex gap-4 items-center">
                    <p className='font-NeueMontreal bg-main2 px-7 py-[11px] rounded-full text-white text-[15.5px]'>All</p>
                    <p className='profile_btn'>Biography</p>
                    <p className='profile_btn'>Albums</p>
                    <p className='profile_btn'>Tracks</p>

                </div>
            </div>

        </div>


        


        <>
          
          {
            open && 
              <form onSubmit={handleSubmit} className="flex items-center justify-between gap-5">

                    <div className='rounded-full  relative group size-[200px] overflow-hidden'>
                        {

                            user?.profile_image ? (
                            <img
                                src={`http://localhost:8000${user.profile_image}`}
                                  // alt={user.username}
                                  onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/Hand.jpeg';// fallback image in /public
                              }}
                              
                              
                                className="rounded-full saturate-[1.2] size-full object-cover"
                            />
                            ) : (
                            <div className="size-fill flex items-center justify-center rounded-full bg-gray-400 text-white text-md font-bold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            )
                          }

                        <div className="absolute rounded-full top-0 left-0 group-hover:opacity-100 opacity-0 duration-200 ease-in-out bg-black/60 items-center flex p-7 justify-between flex-col size-full">
                            <label onClick={() => fileInputRef.current.click()} className='font-NeueMontreal text-[15px] cursor-pointer hover:underline'>
                              Change Picture
                              
                            </label>
                            <FiEdit2 size={50}/>
                            <p onClick={() => setProfileImage(null)} className='font-NeueMontreal text-[15px] cursor-pointer hover:underline '>Remove Picture</p>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageChange}
                              className="hidden"
                              accept="image/*"
                            />
                        </div>

                    </div>
                    <div className="flex flex-col gap-4 items-end">
                      <input className='bg-main/20 font-NeueMontreal text-white py-2 px-2 rounded w-[320px] h-fit' type="text" name='username' value={user.username} onChange={(e) => setUsername(e.target.value)} />
                      <button 
                        className='bg-white font-semibold px-7 py-3 rounded-full text-[#222222] font-NeueMontreal'
                        type='button'
                        onClick={handleUpdate}
                        disabled={isUpdating}
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>

                    </div>

                </form>
          }
        
        </>
        


           {/* <div className="w-full flex-center h-screen fixed top-0 left-0 bg-black/45  z-[200]">
              <div className="w-[600px] gap-7 h-[400px] shadow-2xl p-7 bg-gradient-to-tr from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#000]/10 border border-white/20 rounded backdrop-blur-md  flex flex-col">
              <div className="flex justify-between items-center">
                  <h1 className='font-NeueMontreal font-semibold text-[35px]'>Profile details</h1>
                  <RiCloseLargeLine className='cursor-pointer text-white/70 hover:text-white duration-200 ease-in-out' onClick={() => setIsOpen(false)} size={20} />

              </div>


                  <div className="flex items-center justify-between gap-5">

                      <div className='rounded-full  relative group size-[200px] overflow-hidden'>
                          {

                              user?.profile_image ? (
                              <img
                                  src={`http://localhost:8000${user.profile_image}`}
                                  // alt={user.username}
                                  onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/Hand.jpeg'; // fallback image in /public
                                }}
                                
                                
                                  className="rounded-full saturate-[1.2] size-full object-cover"
                              />
                              ) : (
                              <div className="size-fill flex items-center justify-center rounded-full bg-gray-400 text-white text-md font-bold">
                                  {user.username.charAt(0).toUpperCase()}
                              </div>
                              )
                            }

                          <div className="absolute rounded-full top-0 left-0 group-hover:opacity-100 opacity-0 duration-200 ease-in-out bg-black/60 items-center flex p-7 justify-between flex-col size-full">
                              <p className='font-NeueMontreal text-[15px] cursor-pointer hover:underline '>Change Picture</p>
                              <FiEdit2 size={50}/>
                              <p className='font-NeueMontreal text-[15px] cursor-pointer hover:underline '>Remove Picture</p>
                          </div>

                      </div>
                      <div className="flex flex-col gap-4 items-end">
                        <input className='bg-main/20  font-NeueMontreal text-white py-2 px-2 rounded w-[320px] h-fit' type="text" value={user.username} onChange={(e) => setUsername(e.target.value)} />
                        <button className='bg-white font-semibold px-7 py-3 rounded-full text-[#222222] font-NeueMontreal' type='submit'>Save</button>

                      </div>

                  </div>

              </div>
           </div> */}





        
    </div>
   
  );
}
