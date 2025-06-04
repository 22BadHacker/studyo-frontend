'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AddGenreForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:8000/api/genres', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // if using Sanctum
      });

      setName('');
      setImage(null);
      setPreview(null);
      setSuccess(true);
    } catch (err) {
      console.error('Failed to add genre:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl  font-bold mb-4">Add Genre</h2>
      
      <input
        type="text"
        placeholder="Genre name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-full" />
        </div>
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Genre
      </button>

      {success && <p className="text-green-500 mt-2">✅ Genre added successfully!</p>}
    </form>
  );
};

export default AddGenreForm;
