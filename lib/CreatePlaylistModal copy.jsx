'use client';
import { useState } from 'react';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';

export default function CreatePlaylistModal({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { authToken } = useAppHook();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    if (coverImage) formData.append('cover_image', coverImage);

    try {
      const res = await axios.post('http://localhost:8000/api/playlists', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });
      onCreated(res.data); // Pass created playlist back
      onClose(); // Close modal
    } catch (err) {
      console.error(err);
      alert('Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs z-[9999] bg-black/70 flex items-center justify-center">
      <div className="bg-[#222] p-6 rounded-lg w-[400px] space-y-4">
        <h1 className='font-NeueMontreal text-white font-semibold text-[26px]'>Create Playlist</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Playlist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="w-full"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
