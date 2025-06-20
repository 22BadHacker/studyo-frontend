'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
// import xx from '@/public/xx.svg'
import GenreCard from './GenresCard';
import DualMarquee from './DualMarquee';

const GenresList = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true)

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
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetch('http://localhost:8000/api/genres', { withCredentials: true })
  //       .then(res => res.json())
  //       .then(data => {
  //         setGenres(res.data);
  //         setLoading(false)
  //       })
  //       .catch(err => {
  //         console.error('Failed to fetch artists:', err)
  //         setLoading(false)
  //       })
  //   }, 2000)

  //   return () => clearTimeout(timer)
  // }, [])

  // if (loading) {
  //   return (
  //     <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>
  //   )
  // }

  return (

    <div className='w-full min-h-screen'>

      {/* <div className="link-wrapper  h-[65px]  cursor-pointer w-fit  font-NeueMontreal  text-white/60 font leading-tight font-[600] tracking-[0.015em] text-[50px]">
        <h1 className=' link-text '>Explore All Categories <span className='text-[15px] tracking-wider font-sora'>({genres.length})</span></h1>
        <h1 className=' link-text-clone '>Explore All Categories <span className='text-[15px] tracking-wider font-sora'>({genres.length})</span></h1>
      </div> */}
      <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] '>Explore All <br />Categories <span className='text-[17px] relative -top-1 tracking-wider font-sora'>({genres.length})</span></h1>

      <div className="w-full  grid grid-cols-4 place-items-between gap-x-7 gap-y-10  py-9">
      {genres.map((genre, index) => (
          <GenreCard key={genre.id} genre={genre} index={index} />
        ))}

      </div>

      
    </div>
  );
};

export default GenresList;

// c1cad4
