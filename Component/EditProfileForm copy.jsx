import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAppHook } from '@/context/AppProvider';

const EditProfileForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null); // ✅ Fix here
  const [loading, setLoading] = useState(false);

  const { authToken } = useAppHook();

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]); // ✅ Store image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
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
    <form className="space-y-6 text-white max-w-md mx-auto  p-6 rounded " onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      className="w-full p-2 border outline-none border-gray-300 rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border outline-none border-gray-300 rounded"

      />
      <input
        type="file"
        onChange={handleImageChange}
        // accept="image/*"
      />
      <button className='bg-green-500 px-4 py-1 rounded' type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
        
      </button>
    </form>
  );
};

export default EditProfileForm;
