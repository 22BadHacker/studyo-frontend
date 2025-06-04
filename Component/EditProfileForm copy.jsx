'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';

const EditProfileForm = () => {
  const { user, setUser } = useAppHook();
  const [username, setUsername] = useState(user?.username || '');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('username', username);
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/user/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setUser(res.data.user); // Update context
      alert('Profile updated!');
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block font-bold mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1">Profile Image</label>
        <input
          type="file"
          onChange={(e) => setProfileImage(e.target.files[0])}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-main2 text-white py-2 px-4 rounded hover:bg-main2/80"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default EditProfileForm;
