import React from 'react'
import Trending from './Trending'

export const metadata = {
    title: "Trending — 𝗦𝘁ü𝗱𝘆𝗼 ",
}
const page = () => {
  return (
    <>
      <div className="h-auto pt-[130px] pb-[180px] ">
            <div className="container relative h-screen">
                <h1 className="text-[11.2vw] text-white/75  font-NeueMontreal font-bold uppercase leading-[.85] text-center">Trending <span className=" text-white">music</span> <br /> this Week!</h1>
                <Trending />
            </div>
        </div>
    </>
  )
}

export default page
