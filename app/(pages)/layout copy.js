'use client';
import { useEffect, useState } from 'react'
import Footer from '@/Component/Footer'
import Header from '@/Component/Header'
import Bottom from '@/Component/Bottom';
import Hero from '@/Component/Preloader';
import { motion } from 'framer-motion';


// export const metadata = {
//   title: "𝗦𝘁ü𝗱𝘆𝗼 — Your Music, Your Way.",

// };


const Layout = ({children}) => {

  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1000); // 4s loader
      return () => clearTimeout(timer);
    }, []);

  return (
    
    <div id="scroll-container" className='grid bg-[#000000]  hide-scrollbar  h-screen overflow-y-scroll'>

      {
        loading ? <Hero /> : (
          <>
            <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .5, ease: 'easeInOut' }}  className="w-full  bg-transparent fixed top-0 left-0 right-0 z-50  transition-all " >
              <Header />
            </motion.header> 
          
              {children}
              {/* <Hero /> */}

              <footer className="w-full  h-auto bg-[#000000]">
                  <Footer />

              </footer>
              <motion.div initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: .8 , delay: 1, ease: 'easeInOut'}} className="w-fit z-[30] fixed bottom-7 left-1/2 -translate-x-1/2">
                <Bottom />
              </motion.div>
          </>
        )
      }

    </div>
  )
}

export default Layout


// 0d0d0d
// c3c6c8
// 222222
// e9e9e9
// 202020


// bg-black/10 backdrop-blur-[10px]