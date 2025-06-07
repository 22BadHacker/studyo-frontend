'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppHook } from '@/context/AppProvider';

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { authToken } = useAppHook();

  useEffect(() => {
    // const token = localStorage.getItem('token');
    if (!authToken) return router.push('/Auth/Login');

    axios.get('http://localhost:8000/api/user/profile', {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then(res => {
        setUser(res.data);
        setForm({ username: res.data.username, email: res.data.email, password: '' });
        setLoading(false);
      })
      .catch(() => router.push('/Auth/Login'));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // const token = localStorage.getItem('token');

    axios.put('http://localhost:8000/api/user/profile', form, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then(res => {
        setMessage('Profile updated!');
        setForm({ ...form, password: '' }); // clear password
      })
      .catch(err => {
        setMessage(err.response?.data?.message || 'Error updating profile');
      });
  };

  if (loading) return <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          type="password"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
