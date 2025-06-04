'use client';
import { useState } from 'react';
import axios from 'axios';

const UploadProfileImageButton = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // for Sanctum
      });

      setSuccessMsg('✅ Image uploaded!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setSuccessMsg('❌ Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        {loading ? 'Uploading...' : 'Upload Profile Image'}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
      </label>
      {successMsg && <p className="text-sm text-gray-700">{successMsg}</p>}
    </div>
  );
};

export default UploadProfileImageButton;
