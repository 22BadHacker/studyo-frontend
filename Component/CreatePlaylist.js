// components/CreatePlaylistModal.js
'use client';
import { useState } from 'react';
import axios from 'axios';

export default function CreatePlaylistModal({ userId, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('user_id', userId);
    if (coverImage) formData.append('cover_image', coverImage);

    setLoading(true);
    try {
      const res = await axios.post('/api/playlists', formData);
      onCreated?.(res.data); // optional callback
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      alert("Error creating playlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Create New Playlist</h2>
        <input
          type="text"
          placeholder="Playlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="w-full"
        />
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 text-gray-600">Cancel</button>
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
