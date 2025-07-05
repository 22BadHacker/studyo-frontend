'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppHook } from '@/context/AppProvider'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal'
import EditAlbumModal from '@/Components/EditAlbumModal'
import Link from 'next/link'
import { IoMdPlay } from 'react-icons/io'
import { BsThreeDots } from 'react-icons/bs';


const Library = () => {
    const {authToken} = useAppHook()
    const router = useRouter()
    const [tracks, setTracks] = useState([])
    const [albums, setAlbums] = useState([])
    const [artists, setArtists] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState(null) 
    const [editAlbumModal, setEditAlbumModal] = useState(false)
    const [albumToEdit, setAlbumToEdit] = useState(null)
    const [selectedMenu, setSelectedMenu] = useState(null);


    useEffect(() => {
        if (!authToken) return router.push('/Auth/Login');

        axios.get('http://localhost:8000/api/library', {
          headers: { Authorization: `Bearer ${authToken}` }
        }).then(res => {
          setTracks(res.data.tracks)
          setAlbums(res.data.albums)
          setPlaylists(res.data.playlists)
          setArtists(res.data.user)
        }).catch(err => {
          toast.error('Failed to load library')
          console.error(err)
        })
    }, [])


    const deleteTrack = async (id) => {
    if (!confirm('Are you sure you want to delete this track?')) return;
    await axios.delete(`http://localhost:8000/api/tracks/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    setTracks(tracks.filter(t => t.id !== id))
    toast.success('Track deleted')
  }
  // <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] '>Your Library</h1>

  return (
    <>
    <div className='text-white space-y-10'>
      {/* <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] '>Your Library</h1> */}
      {/* <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] '>welcome {artists.username} <br /> to your library </h1> */}
      {/* <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] '>welcome <img className='w-10 h-10 rounded-full inline-flex' src={`http://localhost:8000/${artists.profile_image}`}/> {artists.username} <br /> to your library </h1> */}

      <div className="flex gap-6 items-end">
          <img className='size-[270px] object-cover rounded-full inline-flex' src={`http://localhost:8000/${artists.profile_image}`}/> 

          <div className="flex flex-col gap-4">
              <h4 className='text-[#d8262c] text-[15px] font-NeueMontreal'>Your Library</h4>
              <h1 className='text-[90px] capitalize leading-[1.1]  font-NeueMontreal  text-white text-shadow-2xs text-shadow-neutral-100  flex gap-3 items-center  font-bold'>{artists.username}</h1>
              <div className="flex gap-[6px] text-[13px] font-NeueMontreal font-medium capitalize tracking-wide items-center">
                 <span>{tracks.length} songs</span>
                 <span className='bg-[#fff] size-[4px] relative top-[1px] rounded-full '></span> 
                 <span>{albums.length} albums</span>
                 <span className='bg-[#fff] size-[4px] relative top-[1px] rounded-full '></span> 
                 <span>{playlists.length} {playlists.length === 1 ? 'playlist' : 'playlists' }</span>
                 
              </div>
          </div>
      </div>

      <section>
        
        <h1 className='text-2xl relative mb-5  flex gap-[7px] items-start  ease-in-out duration-200 w-fit cursor-pointer   hover:text-[#c42b1c] font-NeueMontreal font-semibold'>Your Tracks</h1>
        {tracks.length === 0 ? <p>No tracks yet</p> : (
          <ul className="space-y-2">
            <div className="w-full grid pb-3 border-b-[1px] border-b-white/30 grid-cols-[1fr_.8fr_.8fr_auto]">
            <p className="flex gap-10 text-sm text-main/90 font-NeueMontreal  items-center">
              #
              <span >Title</span>
            </p>
            <p className="flex relative -left-0 gap-10 text-sm text-main/90 font-NeueMontreal  items-center"> Album</p>
            <p className="flex relative -left-3 gap-10 text-sm text-main/90 font-NeueMontreal  items-center"> Duration</p>
            <p className="flex relative -left-6 gap-10 text-sm text-main/90 font-NeueMontreal  items-center"> Action</p>

            </div>
            {tracks.map((track, i) => (
              <li key={track.id} className="grid grid-cols-[1fr_.8fr_.8fr_auto] items-center  px-4 py-1 rounded">
                <div className="flex gap-3 items-center">
                  <p className='text-md font-semibold mr-3'>{i+1}</p>
                  <img className='size-11 rounded' src={`http://localhost:8000/storage/${track.cover_image}`} alt="" />
                  <span className='text-sm font-medium font-NeueMontreal'>{track.title}</span>
                </div>
                <p className='text-[15.5px] font-medium'>{track.album.title}</p>
                <p className='text-sm font-semibold'>{track.duration}</p>
                <button 
                    onClick={() => {
                      setDeleteTarget({ type: 'track', id: track.id })
                      setModalVisible(true)
                    }} 
                    className="text-red-400"
                  >
                    Delete
                  </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">Your Albums</h2>
        {albums.length === 0 ? <p>No albums yet</p> : (
           <div className=' relative -left-2 w-full  grid grid-cols-8 gap-[2px]'>
          {albums.map(album => (
              <div className='relative group' key={album.id}>
                {/* Three dots menu button */}
                <div className="absolute  right-3 top-3 z-[50]  transition-opacity duration-200">
                  <div className="relative">
                    <button 
                      className="p-[5px] rounded-full bg-[#2a2a2a]/20 backdrop-blur-sm text-white/80 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSelectedMenu(selectedMenu === album.id ? null : album.id);
                      }}
                    >
                      <BsThreeDots className="text-xl" />
                    </button>
                    
                    {/* Dropdown menu */}
                    {selectedMenu === album.id && (
                      <div className="absolute left-0 mt-2 w-40 bg-white  rounded-md shadow-lg py-1 z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            navigator.clipboard.writeText(`${window.location.origin}/album/${album.public_id}`);
                            setSelectedMenu(null);
                            // Add toast notification here if you want
                          }}
                          className="block px-4 border-b-[.5px] border-b-black/30 py-2 text-sm text-black font-NeueMontreal hover:bg-main2/20 w-full text-left"
                        >
                          Copy album link
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setAlbumToEdit(album);
                            setEditAlbumModal(true);
                            setSelectedMenu(null);
                          }}
                          className="block px-4 border-b-black/30 border-b-[.5px] py-2 text-sm text-black font-NeueMontreal hover:bg-main2/20 w-full text-left"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setDeleteTarget({ type: 'album', id: album.id });
                            setModalVisible(true);
                            setSelectedMenu(null);
                          }}
                          className="block px-4 font-NeueMontreal hover:bg-main2/20 py-2 text-sm text-red-400  w-full text-left"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group flex-col gap-[6px]'
                >
                  <div className="relative h-[176px] w-[190px]">
                    <img 
                      className='h-[176px] w-[190px] saturate-[1.4] rounded-sm object-cover' 
                      src={`http://localhost:8000/storage/${album.cover_image}`} 
                      alt={album.title} 
                    />
                    <span className="size-[45px] group-hover:bottom-2 bottom-0 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                      <IoMdPlay />
                    </span>
                  </div>

                  <div className="flex flex-col gap-[2px]">
                    <Link href={`/album/${album.public_id}`}  className="font-semibold hover:underline line-clamp-2 tracking-wide leading-tight mt-1 text-[16.5px] font-NeueMontreal text-white capitalize text-lg">
                      {album.title}
                    </Link>
                    <p className='text-[12.5px] pt-1 capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>
                      {new Date(album.release_date).getFullYear()} 
                      <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span> 
                      album
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        )}
      </section>
     
      <section>
        <h2 className="text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">Playlists</h2>
        {playlists.length === 0 ? <p>No playlists yet</p> : (
          <ul className="space-y-2">
            {playlists.map(playlist => (
              <Link href={`/Playlists/${playlist.public_id}`} className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group  flex-col gap-[6px]' key={playlist.id}>
              <div className="relative ">
                  <img className='h-[176px]  w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${playlist.cover_image}`} alt={playlist.title} />
                  <span className="size-[45px] group-hover:bottom-2 bottom-0 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                    <IoMdPlay />
                  </span>

              </div>

              <div className="flex flex-col gap-[2px]">
                
                  <h5 className="font-semibold line-clamp-2      tracking-wide leading-tight mt-1 text-[16.5px] font-NeueMontreal text-white capitalize text-lg">{artists.username} - {playlist.name}</h5>

                <p className='text-[12.5px] pt-1 capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>playlist <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span> by {artists.username} </p>

              </div>
              {/* <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{artist.username}</p> */}
            </Link>
            ))}
          </ul>
        )}
      </section>
    </div>
    <ConfirmDeleteModal
      show={modalVisible}
      itemName={deleteTarget?.type}
      onClose={() => setModalVisible(false)}
      onConfirm={async () => {
        try {
          if (deleteTarget.type === 'track') {
            await axios.delete(`http://localhost:8000/api/tracks/${deleteTarget.id}`, {
              headers: { Authorization: `Bearer ${authToken}` }
            })
            setTracks(prev => prev.filter(t => t.id !== deleteTarget.id))
          } else if (deleteTarget.type === 'album') {
            await axios.delete(`http://localhost:8000/api/albums/${deleteTarget.id}`, {
              headers: { Authorization: `Bearer ${authToken}` }
            })
            setAlbums(prev => prev.filter(a => a.id !== deleteTarget.id))
          }
          toast.success(`${deleteTarget.type} deleted successfully`)
        } catch (err) {
          toast.error(`Failed to delete ${deleteTarget.type}`)
        } finally {
          setModalVisible(false)
        }
      }}
    />



      <EditAlbumModal
        show={editAlbumModal}
        album={albumToEdit}
        token={authToken}
        onClose={() => setEditAlbumModal(false)}
        onUpdate={(updatedAlbum) => {
          setAlbums(prev => prev.map(a => a.id === updatedAlbum.id ? updatedAlbum : a))
        }}
      />
    </>
  )
}

export default Library
