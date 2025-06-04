import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EditProfileForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null); // ✅ Fix here
  const [loading, setLoading] = useState(false);

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
      formData.append('profile_image', profileImage); // ✅ use correct state
    }
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/update`

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true
      });
      await axios.post('http://localhost:8000/api/profile/update', formData, {
      withCredentials: true
    });

      toast.success('✅ Profile updated!');
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6 max-w-md mx-auto bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default EditProfileForm;
