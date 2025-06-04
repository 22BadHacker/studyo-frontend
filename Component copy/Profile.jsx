// components/Profile.js
import React, { useState, useEffect } from 'react';
import { useAppHook } from '../contexts/AppProvider';

const Profile = () => {
  const { user, setUser, notifySuccess, notifyError } = useAppHook();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        password: '',
        password_confirmation: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/profile', formData);
      setUser(res.data);
      notifySuccess('Profile updated successfully!');
    } catch (error) {
      notifyError('Failed to update profile.');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="artist">Artist</option>
          <option value="user">User</option>
        </select>
      </div>
      <div>
        <label>New Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input name="password_confirmation" type="password" value={formData.password_confirmation} onChange={handleChange} />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
