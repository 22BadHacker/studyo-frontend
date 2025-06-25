import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useAppHook } from '@/context/AppProvider';
// import usePa

const Playlist = () => {
    const { public_id } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const { authToken } = useAppHook();

  useEffect(() => {
    axios.get(`/api/user/${public_id}/playlists`, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(res => setPlaylists(res.data))
      .catch(err => console.error(err));
  }, [public_id]);

  return (
    <div className="grid gap-4">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="bg-white/5 p-4 rounded-lg">
          <img src={`http://localhost:8000/storage/${playlist.cover_image}`} className="w-full h-40 object-cover rounded" />
          <h2 className="mt-2 font-semibold text-white">{playlist.name}</h2>
          <p className="text-xs text-gray-400">{playlist.tracks.length} tracks</p>
        </div>
      ))}
    </div>
  );
};


export default Playlist;