'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { IoIosAddCircleOutline, IoMdPlay } from 'react-icons/io'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import Link from 'next/link'
import Albums from '../AlbumList'



const Album = () => {
  const { public_id } = useParams()
  const [album, setAlbum] = useState(null)
  const [hover, setHover] = useState(false);
  
  
 const [moreAlbums, setMoreAlbums] = useState([])

  useEffect(() => {
    if (public_id) {
      axios.get(`http://localhost:8000/api/albums/${public_id}`)
        .then(res => {
          setAlbum(res.data.album)
          setMoreAlbums(res.data.more_albums)
        })
        .catch(err => console.error(err))
    }
  }, [public_id])

 

 




//   if (!album) return <p className="text-white">Loading...</p>
if (!album) return <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;

  return (
    <>
    <div className="absolute w-full h-screen top-0 left-0">
        <img className='w-full saturate-[1.2] opacity-65 h-full  object-cover ' src={`http://localhost:8000/storage/${album.cover_image}`} alt="" />
        <div className="w-full  z-[6]   bg-gradient-to-b from-black/50 via-[#000000]/100 to-[#000000]/100 absolute top-0 left-0 h-full" />
    </div>

    <div className="text-white  pt-12 relative z-20">

      <div className="w-full flex justify-between items-end">
        <div className="flex gap-5 items-end">
          <img className='size-[250px] rounded-md' src={`http://localhost:8000/storage/${album.cover_image}`} alt="" />
          <div className="flex flex-col">
            {/* <h5 className='text-white/80  font- uppercase tracking-wide font-NeueMontreal text-[13px]'>Album</h5> */}
            <h1 className="text-[72px] pb-2 capitalize leading-[1.1]  font-NeueMontreal  text-white  flex gap-3 items-center  font-bold">{album.title}</h1>
            <div className="flex pb-7 font-NeueMontreal items-center gap-3">
              <div className="size-10  bg-green-500/50 rounded-full p-[1px]">
                <img className='size-full  rounded-full  object-cover ' src={`http://localhost:8000/${album.user.profile_image}`} alt="" />

              </div>
                
                <h5 className='text-white/80  font-semibold capitalize tracking-wide font-NeueMontreal text-[13px]'>{album.user.username} </h5>
            </div>

            
            <h4 className='text-white/80 flex items-center gap-[6px] uppercase pb-1  font-medium  tracking-wide font-NeueMontreal text-[12px]'>Album <span className='size-1  rounded-full bg-white'></span> {album.tracks.length} songs <span className='size-1  rounded-full bg-white'></span>{album?.release_date ? (
                <p>{new Date(album.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              ) : (
                <p>Unknown Release Date</p>
              )}</h4>
            {/* <h4 className='text-white/80 flex items-end gap-1  font-medium  tracking-wide font-NeueMontreal text-[13px]'>Album <span className='size-1 mb-1 rounded-full bg-white'></span> {album.tracks.length} songs </h4> */}
            {/* <p className='text-white/80 uppercase flex items-end gap-1  font-medium  tracking-wide font-NeueMontreal text-[12px] pt-1'>{formattedDate}</p> */}


          </div>

        <div className="flex relative -left-2 scale-80 items-center gap-5">
            <div className="px-6 py-2 text-main2 rounded-full bg-white">Play All</div>
            <div className="px-6 py-2 text-main rounded-full bg-main2">Shuffle</div>
            <div className="px-6 py-2 text-main rounded-full bg-main2">Save</div>
        </div>
        </div>


      </div>
      


            <h2 className="text-2xl pt-20 hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">Album Songs</h2>
      <div className="w-full items-center grid grid-cols-1  gap-10">
        <div className="">

            <ul className="space-y-2 pt-5">
              {album.tracks.map((track, i) => (
                <div className="w-full group py-2 hover:bg-main2/60 px-3 rounded  grid grid-cols-[1fr_.7fr_auto] items-center justify-between" key={track.id}>
                    <div className="flex items-center gap-4">
                        <span className={`text-[#d7d7d7]/70 relative text-[16px] w-3 flex-center font-semibold  mr-1`}><IoMdPlay className='absolute opacity-0 group-hover:opacity-100 ' size={15} /> <span className='opacity-100 group-hover:opacity-0'>{ i + 1 } </span> </span>
                        {/* <img
                        src={`http://localhost:8000/storage/${track.cover_image}`}
                        
                        className="size-11 saturate-150 object-cover rounded-sm"
                      /> */}
                        <span className="font-medium text-[#fff]/95  text-[16.5px]">{track.title}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="font-medium text-[#fff] font-NeueMontreal text-[16px]">{album.user.username}</span>
                        {/* <span className="font-medium text-[#fff]/90 text-[16px]"><span className=''></span>{track.album.title}</span> */}
                    </div>

                    <div className="flex gap-3 items-center">
                      <IoIosAddCircleOutline  className=' text-[17px] relative right-2 opacity-0 group-hover:opacity-100 '/>
                      <p>{track.duration}</p>
                      <HiOutlineDotsHorizontal  className=' text-[17px] opacity-0 group-hover:opacity-100 '/>

                    </div>
                </div>
              ))}
            </ul>
        </div>



      <div className="">
        <h2 className="text-2xl pt-20 pb-5 hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">About The Album</h2>

        <div className="flex h-[580px] flex-col w-full  relative  gap-3 ">
          <div className=" flex items-center gap-3 z-[10] absolute top-3 left-3">
            <div className="size-10  bg-green-500/50 rounded-full p-[1px]">
              <img className='size-full  rounded-full  object-cover ' src={`http://localhost:8000/${album.user.profile_image}`} alt="" />
            </div>
            <h5 className='text-white/80   font-semibold capitalize tracking-wide font-NeueMontreal text-[13px]'>{album.user.username} </h5>
          </div>


          <img className='size-full saturate-[1.2] opacity-90 object-cover rounded-md' src={`http://localhost:8000/storage/${album.cover_image}`} alt="" />
          <div className="w-full  z-[6] opacity-95  bg-gradient-to-b from-black/100 via-[#000000]/0 backdrop-blur-sm to-[#000000]/100 absolute top-0 left-0 h-full" />
          <p className="absolute bottom-4 left-4 z-[20] text-white font-semibold text-sm font- w-[550px]">{album.description}</p>

        </div>
      </div>
      </div>

      {/* <p className="mb-6 text-[13px] font- w-[400px]">{album.description}</p> */}

      <h2 className="text-2xl pt-20 pb-1 hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">More Album by {album.user.username}</h2>
      {/* <div className="relative -left-2 w-full grid grid-cols-6 gap-[12px] pt-5">
          {moreAlbums.map((a) => (
            <Link
              key={a.id}
              href={`/album/${a.public_id}`}
              className="cursor-pointer hover:scale-[1.01] duration-200 ease-in-out flex flex-col gap-2"
            >
              <img
                src={`http://localhost:8000/storage/${a.cover_image}`}
                className="w-full h-[190px] object-cover rounded-md saturate-[1.3]"
                alt={a.title}
              />
              <h5 className="font-NeueMontreal text-white/90 font-semibold text-[15px] leading-tight">
                {a.title}
              </h5>
              <p className="text-white/60 font-light text-[12px]">
                {new Date(a.release_date).getFullYear()}
              </p>
            </Link>
          ))}
        </div> */}

        {moreAlbums.length > 0 ? (
        <div className=' relative -left-2 w-full  grid grid-cols-8 gap-[2px]'>
          {moreAlbums.map(album => (
            <Link href={`/album/${album.public_id}`} className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group  flex-col gap-[6px]' key={album.id}>
              <div className="relative ">
                  <img className='h-[176px]  w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${album.cover_image}`} alt={album.title} />
                  <span className="size-[45px] bottom-2 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                    <IoMdPlay />
                  </span>

              </div>

              <div className="flex flex-col gap-[2px]">
                <div className=" h-[26px]  relative inline-block   overflow-hidden font-semibold tracking-wide mt-1 text-[16.5px] font-NeueMontreal text-white/90 capitalize text-lg">
                  <h5 className="block transition-transform duration-300 relative top-[0px]  group-hover:-translate-y-full ease-in-out">{album.title}</h5>
                  <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{album.title}</h5>
                </div>

                <p className='text-[12px] capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>{new Date(album.release_date).getFullYear()} <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span> album</p>

              </div>
              {/* <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{artist.username}</p> */}
            </Link>
          ))}
        </div>
      ) : (
        <p>No albums found</p>
      )}

          
    </div>
      
    </>
  )
}

export default Album
