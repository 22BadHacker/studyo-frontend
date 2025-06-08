import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAppHook } from '@/context/AppProvider';
import { FiEdit2 } from 'react-icons/fi';

const EditProfileForm = () => {
  const { authToken, user } = useAppHook();

  const [username, setUsername] = useState(user.username || '');
  const [profileImage, setProfileImage] = useState(null); // ✅ Fix here
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();


  const handleRemoveImage = async () => {
  if (!confirm('Are you sure you want to remove your profile image?')) return;

  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

    await axios.post(
      'http://localhost:8000/api/profile/remove-image',
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    

    toast.success('Profile image removed.');
    setProfileImage(null); // Clear the local selected image
    user.profile_image = null; // Update the context or force refetch if needed
  } catch (error) {
    console.error(error);
    toast.error('Failed to remove profile image');
  }
};



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
    if (profileImage) {
      formData.append('profile_image', profileImage); // 
    }
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/update`

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
    <form className="grid grid-cols-[auto_1fr] place-items-center gap-5 text-white  " onSubmit={handleSubmit}>

     <div className='rounded-full  relative group size-[180px] overflow-hidden'>
        {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Selected profile"
              className="rounded-full saturate-[1.2] size-full object-cover"
            />
          ) : user?.profile_image ? (
            <img
              src={`http://localhost:8000${user.profile_image}`}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/Hand.jpeg';
              }}
              className="rounded-full saturate-[1.2] size-full object-cover"
            />
          ) : (
            <div className="size-full text-[25px] flex items-center justify-center rounded-full bg-gray-400 text-white text-md font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}


        <div className="absolute rounded-full top-0 left-0 group-hover:opacity-100 opacity-0 duration-200 ease-in-out bg-black/60 items-center flex p-7 justify-between flex-col size-full">
            <p onClick={() => fileInputRef.current.click()}  className='font-NeueMontreal text-[15px] cursor-pointer hover:underline '>Change Picture </p>
            <FiEdit2 size={50}/>
            <p onClick={handleRemoveImage}  className='font-NeueMontreal text-[15px] cursor-pointer hover:underline '>Remove Picture</p>

            <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>

    </div>

    <div className="flex w-full  flex-col gap-3 items-end">
        <input
          type="text"
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        className=" p-[10px] text-[15px] w-full font-NeueMontreal capitalize h-fit border outline-none bg-main2/10 border-gray-300/40 rounded"
        />

        <button className='bg-white text-[15px] font-semibold px-7 py-3 rounded-full text-[#222222] font-NeueMontreal' type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
          
        </button>

    </div>



      
    </form>
  );
};

export default EditProfileForm;

        // {
        //   profileImage && (
        //     <img
        //       src={URL.createObjectURL(profileImage)}
        //       alt="Profile"
        //       className="w-32 h-32 object-cover rounded-full mb-4"
        //     />
        //   )
        // }