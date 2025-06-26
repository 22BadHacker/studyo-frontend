'use client';
import { useEffect, useState } from 'react'
import Footer from '@/Component/Footer'
import Header from '@/Component/Header'
import Bottom from '@/Component/Bottom';
import Hero from '@/Component/Preloader';
import { motion } from 'framer-motion';

const ClientLayout = ({children}) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-[#000000] hide-scrollbar h-auto'>
      {loading ? <Hero /> : (
        <>
          <header className="w-full bg-transparent fixed top-0 left-0 right-0 z-50 transition-all">
            <Header />
          </header> 
        
          {children}

          <footer style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)'}} className="w-full h-[640px] relative bg-[#080808]">
            <div className="fixed flex bottom-0 w-full h-[640px]">
              <Footer />
            </div>
          </footer>
          <div className="">
            <Bottom />
          </div>
        </>
      )}
    </div>
  )
}

export default ClientLayout;