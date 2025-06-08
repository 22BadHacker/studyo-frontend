'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
// import xx from '@/public/xx.svg'
import GenreCard from './GenresCard';

const GenresList = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/genres', {
          withCredentials: true,
        });
        setGenres(res.data);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };

    fetchGenres();
  });

  return (

    <>
      <div className="link-wrapper  h-[65px]  cursor-pointer w-fit  font-NeueMontreal  text-white/60 font leading-tight font-[600] tracking-[0.015em] text-[50px]">
        <h1 className=' link-text '>Explore All Categories <span className='text-[15px] tracking-wider font-sora'>({genres.length})</span></h1>
        <h1 className=' link-text-clone '>Explore All Categories <span className='text-[15px] tracking-wider font-sora'>({genres.length})</span></h1>

      </div>
      <div className="w-full  grid grid-cols-4 place-items-between gap-x-7 gap-y-10  py-9">
      {genres.map((genre, index) => (
          <GenreCard key={genre.id} genre={genre} index={index} />
        ))}

      </div>
    </>
  );
};

export default GenresList;

// c1cad4
