'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    username: '', bio: '', profile_image: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (session) {
      axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${session?.token}` }
      }).then(res => {
        setForm(res.data);
        setPreview(res.data.profile_picture);
      });
    }
  }, [session]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    const file = e.target.files[0];
    setForm(prev => ({ ...prev, profile_picture: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('bio', form.bio);
    if (form.profile_picture instanceof File) {
      formData.append('profile_picture', form.profile_picture);
    }

    await axios.post('/api/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${session?.token}`
      }
    });
    alert("Profile updated!");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {preview && <img src={preview} className="w-24 h-24 rounded-full object-cover mb-2" />}
          <input type="file" onChange={handleFile} />
        </div>
        <div>
          <label className="block font-medium">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
