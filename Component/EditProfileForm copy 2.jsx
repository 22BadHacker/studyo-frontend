import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAppHook } from '@/context/AppProvider';

const EditProfileForm = () => {
  const { authToken} = useAppHook();

  // const [selectedImage, setSelectedImage] = useState(null);
 const [username, setUsername] = useState(user?.username || '');
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

  return (


    <>
       <button
        onClick={() => setOpen(true)}
        className="bg-main2/80 rounded-full text-white px-4 py-2 font-semibold hover:bg-main2/80"
      >
        Edit Profile
      </button>

      {
        open && 
          <form onSubmit={handleSubmit} className="flex items-center justify-between gap-5">

                <div className='rounded-full  relative group size-[200px] overflow-hidden'>
                    {

                        user?.profile_image ? (
                        <img
                            src={profileImage ? URL.createObjectURL(profileImage) : user.profile_image}
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
                  <input className='bg-main/20 font-NeueMontreal text-white py-2 px-2 rounded w-[320px] h-fit' type="text"  value={user.username} onChange={(e) => setUsername(e.target.value)} />
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





    // <form className="space-y-6 text-white max-w-md mx-auto  p-6 rounded " onSubmit={handleSubmit}>

    //   <input
    //     type="text"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //     placeholder="Username"
    //   className="w-full p-2 border outline-none border-gray-300 rounded"
    //   />
    //   <input
    //     type="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     placeholder="Email"
    //     className="w-full p-2 border outline-none border-gray-300 rounded"

    //   />
    //   <input
    //     type="file"
    //     onChange={handleImageChange}
    //     // accept="image/*"
    //   />
    //   <button className='bg-green-500 px-4 py-1 rounded' type="submit" disabled={loading}>
    //     {loading ? 'Updating...' : 'Update Profile'}
        
    //   </button>
    // </form>
  );
};

export default EditProfileForm;
