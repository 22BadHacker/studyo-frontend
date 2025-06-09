import React from 'react'

const Track = () => {
  return (
    <div className='w-full pt-11 grid grid-cols-2 gap-10'>
        <div className="flex flex-col gap-6">
            <h1 className='text-2xl text-white font-NeueMontreal font-semibold'>New Releases</h1>
        </div>
        <div className="flex flex-col gap-6">
            <h1 className='text-2xl text-white font-NeueMontreal font-semibold'>Top Tracks</h1>
        </div>
    </div>
  )
}

export default Track
