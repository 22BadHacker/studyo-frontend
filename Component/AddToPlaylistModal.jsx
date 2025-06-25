'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';
// import { headers } from 'next/headers';

export default function AddToPlaylistModal({ show, onClose, userId, trackId }) {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { authToken } = useAppHook();

  useEffect(() => {
    if (show) {
      axios.get(`/api/users/${userId}/playlists`)
        .then(res => setPlaylists(res.data))
        .catch(err => console.error(err));
    }
  }, [show]);

  const handleAddToPlaylist = (playlistId) => {
    axios.post(`/api/playlists/${playlistId}/tracks`, {
      track_id: trackId,
      headers: { Authorization: `Bearer ${authToken}` },
    }).then(() => {
      alert('Track added!');
      onClose();
    }).catch(err => console.error(err));
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName) return;
    axios.post('/api/playlists', {
      name: newPlaylistName,
      user_id: userId,
      headers: { Authorization: `Bearer ${authToken}` },
    }).then(res => {
      setPlaylists([...playlists, res.data]);
      setNewPlaylistName('');
    }).catch(err => console.error(err));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Add to Playlist</h2>

        <div className="space-y-3 max-h-[200px] overflow-y-auto">
          {playlists.map(pl => (
            <div key={pl.id} className="flex justify-between items-center border-b py-2">
              <span>{pl.name}</span>
              <button
                onClick={() => handleAddToPlaylist(pl.id)}
                className="text-sm px-2 py-1 bg-green-500 text-white rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-4">
          <input
            type="text"
            value={newPlaylistName}
            onChange={e => setNewPlaylistName(e.target.value)}
            placeholder="New playlist name"
            className="border w-full p-2 text-sm rounded mb-2"
          />
          <button
            onClick={handleCreatePlaylist}
            className="w-full text-sm px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create Playlist
          </button>
        </div>

        <button
          onClick={onClose}
          className=" text-red-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
