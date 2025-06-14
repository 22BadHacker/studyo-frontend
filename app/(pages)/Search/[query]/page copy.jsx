import React from 'react'
import SearchResults from './Search'


export const metadata = {
    title: "Search | 𝗦𝘁ü𝗱𝘆𝗼 ",
}
const page = () => {
  return (
    <div className='w-full relative py-[120px] h-auto min-h-screen'>

        <div className="container">
            <SearchResults />
        </div>
      
    </div>
  )
}

export default page
