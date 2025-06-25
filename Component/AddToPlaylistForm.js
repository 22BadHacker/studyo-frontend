// components/AddToPlaylistForm.js
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';

export default function AddToPlaylistForm({ trackId, userId }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const { authToken } = useAppHook();

  useEffect(() => {
    axios.get(`/api/users/${userId}/playlists`,{ headers: { Authorization: `Bearer ${authToken}` } })
      .then(res => setPlaylists(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  const handleAdd = async () => {
    if (!selectedPlaylist) return;
    try {
      await axios.post(`/api/playlists/${selectedPlaylist}/tracks`, { track_id: trackId},{ headers: { Authorization: `Bearer ${authToken}` } });
      alert("Track added to playlist!");
    } catch (error) {
      console.error(error);
      alert("Error adding track to playlist");
    }
  };

  return (
    <div className="space-y-3">
      <select
        onChange={(e) => setSelectedPlaylist(e.target.value)}
        className="bg-black text-white border px-2 py-1"
      >
        <option value="">Select playlist</option>
        {playlists.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <button
        onClick={handleAdd}
        className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white"
      >
        Add to Playlist
      </button>
    </div>
  );
}
