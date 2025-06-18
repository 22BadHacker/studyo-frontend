'use client'
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const MenuToggle = () => {
  const [open, setOpen] = useState(false);
   const [showX, setShowX] = useState(false);

  const toggleMenu = () => {
    if (!open) {
      setOpen(true);
      setTimeout(() => setShowX(true), 400); // delay X until lines disappear
    } else {
      setShowX(false); // hide X immediately
      setTimeout(() => setOpen(false), 400); // delay showing hamburger again
    }
  };

  return (

    <AnimatePresence>
        <div className="relative z-20 overflow-hidden w-9 h-9 cursor-pointer" onClick={toggleMenu}>
        {/* Hamburger lines */}
        <span
            className={`absolute right-0 top-[10px] h-[2px] bg-white transition-all duration-200 ease-in-out ${
            open ? 'w-0 right-0' : 'w-full left-0'
            }`}
        />
        <span
            className={`absolute right-0 top-[16px] h-[2px] bg-white transition-all duration-500 ease-in-out ${
            open ? 'w-0 right-0' : 'w-full left-0'
            }`}
        />

        {/* X icon (two lines forming X) */}
        <motion.span exit={{width: '0%'}} transition={{ duration: 0.3,delay:.1, ease: 'linear' }} animate={{ height: showX ? '2px' : '0%', width: showX ? '100%' : '0%', top: showX ? '12px' : '0px' }}
            className={`absolute top-[12px] left-0  h-[2px] bg-white rotate-45 origin-center `}
        />
        <motion.span exit={{width: '0%'}} transition={{ duration: 0.2, ease: 'linear' }} animate={{ width: showX ? '100%' : '0%', height: showX ? '2px' : '0%', top: showX ? '12px' : '0px' }}
            className={`absolute top-[12px] right-0 w-0 h-[2px] bg-white -rotate-45 origin-center `}
        />
        </div>

        <AnimatePresence>

        {
            open && (
                <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ duration: 0.3, delay: .6, ease: 'linear' }} exit={{ opacity: 0, transition: { duration: 0.3, delay: .6, ease: 'linear' }}} className="fixed flex justify-center top-0 bg-black left-0 w-full h-screen overflow-y-scroll  z-[5]">

                  <div className="h-auto pt-[120px] pb-[180px]">
                    <div className="container ">
                      <h1 className="text-[11.2vw]  font-NeueMontreal font-bold uppercase leading-[.85] text-center">Trending <span className=" text-green-500">music</span> <br /> this Week!</h1>
                      
                        {/* <div className="flex flex-col gap-10">

                            <img className='size-[700px] object-cover' src="/images/lola.jpg" alt="" />
                        </div> */}
                    </div>

                  </div>

                </motion.div>
            )
        }
        </AnimatePresence>


    </AnimatePresence>
  );
};

export default MenuToggle;
