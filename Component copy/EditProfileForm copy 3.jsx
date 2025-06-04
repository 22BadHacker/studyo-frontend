'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';

const EditProfileForm = () => {
  const { user, setUser } = useAppHook();
  const [username, setUsername] = useState(user?.username || '');
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(user?.profile_image ? `http://127.0.0.1:8000/storage/${user.profile_image}` : '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profileImage) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(profileImage);
    }
  }, [profileImage]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();
  formData.append('username', username);
  // formData.append('email', email);
  if (image) {
    formData.append('profile_image', image);
  }

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/profile/update',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    toast.success('✅ Profile updated!');
  } catch (error) {
    console.error(error);
    toast.error('❌ Failed to update profile');
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-main2">Edit Profile</h2>

      {preview && (
        <div className="flex justify-center">
          <img src={preview} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border" />
        </div>
      )}

      <div>
        <label className="block font-semibold mb-1">Username</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Profile Image</label>
        <input
          type="file"
          className="w-full"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-main2 text-white px-6 py-2 rounded hover:bg-main2/90"
      >
        {loading ? 'Updating...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default EditProfileForm;
