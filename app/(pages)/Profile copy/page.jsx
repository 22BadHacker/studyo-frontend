'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: '', bio: '', profile_picture: null });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (session?.token) {
      axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${session.token}` }
      }).then(res => {
        setProfile(res.data);
        setForm({
          username: res.data.username,
          bio: res.data.bio,
          profile_picture: null,
        });
        setPreview(res.data.profile_picture);
      });
    }
  }, [session]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setForm({ ...form, profile_picture: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('bio', form.bio);
    if (form.profile_picture) {
      formData.append('profile_picture', form.profile_picture);
    }

    const res = await axios.post('/api/profile', formData, {
      headers: {
        Authorization: `Bearer ${session.token}`,
        'Content-Type': 'multipart/form-data',
      }
    });

    setProfile(res.data);
    setEditMode(false);
  };

  if (!profile) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

      <div className="flex items-center space-x-4 mb-6">
        <img
          src={preview || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-semibold">{profile.username}</h2>
          <p className="text-gray-500">{profile.role}</p>
        </div>
      </div>

      <div className="mb-4">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Date of Birth:</strong> {profile.date_of_birth}</p>
        <p><strong>Bio:</strong> {profile.bio || 'No bio yet'}</p>
      </div>

      <button
        onClick={() => setEditMode(!editMode)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {editMode ? 'Cancel' : 'Edit Profile'}
      </button>

      {editMode && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Profile Picture</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
