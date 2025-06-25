'use client';
import { useState, useEffect } from 'react';
import CreatePlaylistModal from './CreatePlaylistModal';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';
import { PlusOutlined } from '@ant-design/icons';
import { IoIosAddCircleOutline } from 'react-icons/io';

export default function PlaylistPage({ userId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const { authToken } = useAppHook();

  const fetchPlaylists = async () => {
    const res = await axios.get(`http://localhost:8000/api/users/${userId}/playlists`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    setPlaylists(res.data);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <>
      <div className="">
        <button
          onClick={() => setModalOpen(true)}
          className=" relative top-[3px] text-[17px] right-2  text-white "
        >
          {/* <PlusOutlined /> */}
          <IoIosAddCircleOutline />
        </button>

        {/* <div className="grid grid-cols-2 gap-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="p-4 bg-gray-100 rounded shadow">
              <img
                src={`http://localhost:8000/storage/${playlist.cover_image}`}
                alt={playlist.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">{playlist.name}</h3>
            </div>
          ))}
        </div> */}

      </div>
        <CreatePlaylistModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreated={(newPlaylist) => {
            setPlaylists([newPlaylist, ...playlists]);
          }}
        />
    </>
  );
}
