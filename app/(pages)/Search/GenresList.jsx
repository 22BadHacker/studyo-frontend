'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '@/public/Logo/Studyo_white.svg'
import logo2 from '@/public/Logo/Studyo_red.svg'
import Image from 'next/image';
import icon from '../../../app/icon.svg'

const GenresList = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/genres');
        setGenres(res.data);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };

    fetchGenres();
  }, []);

  return (

      <>
        {genres.map((genre) => (
            <div key={genre.id} className=" h-[310px] duration-200 ease-in-out cursor-pointer group  flex items-end w-full relative overflow-hidden  bg-main ">
                {genre.image ? (
                    <img
                    src={genre.image}
                    alt={genre.name}
                    className="size-full  saturate-150 absolute top-0 left-0 object-cover"
                    />
                ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-gray-300 rounded-full mb-2">
                    ❌
                    </div>
                )}
                

                <div className="absolute top-0 left-0  size-full bg-gradient-to-tr from-[#000]/20 via-[#d8dfe8]/10 to-[#d8dfe8]/10"></div>
                <div className="absolute top-0 left-0  size-full bg-gradient-to-tr from-[#000]/80 via-[#000]/10 to-[#d8dfe8]/0"></div>

                <div className="absolute mix-blend-difference top-[14px] left-[14px]">
                    <Image src={logo} className='saturate-[1.5] w-[70px] ' alt='Logo '/>
                </div>

                <div className="w-full mix-blend-difference  group-hover:mix-blend-normal duration-200 ease-in-out text-white  relative h-[55px] flex items-center px-3  gap-2 capitalize  text-[22px] tracking-tight  font-[800] ">
                    <span className='h-[27px] bg-[#d8262c] w-[5px]'></span>
                    <span className='h-[30px]    flex items-center '>{genre.name}</span></div>
                    
            </div>
        ))}
    </>
    
  );
};

export default GenresList;
