import React from 'react'
import GenresList from './GenresList'



const Search = () => {
  return (
    <>
      {/* <img className='absolute h-[20%] w-full object-cover top-0 left-0' src='/images/img28.jpg'/> */}
      {/* <div className="absolute bg-gradient-to-r backdrop-blur-2xl w-full h-screen from-[#000000]/50 via-[#000000]/10 to-[#000000]/50 top-0 left-0"></div> */}
      <div className='container relative'>
          <h1 className='text-[70px]  font-NeueMontreal text-green-500 font leading-tight font-[800]'>Explore All Categories</h1>
          <div className="pt-10 grid grid-cols-5 gap-6">
              <GenresList />
          </div>
      </div>
    </>
  )
}

export default Search
