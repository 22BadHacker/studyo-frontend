import Footer from '@/Component/Footer'
import Header from '@/Component/Header'
import Bottom from '@/Component/Bottom';
import Image from 'next/image';
import logo from '@/public/Logo/Studyo_white.svg'
import Effect from '@/SmallComponent/Effect';
import Settings from '@/Component/Settings';



// export const metadata = {
//   title: "𝗦𝘁ü𝗱𝘆𝗼 — Your Music, Your Way.",

// };


const Layout = ({children}) => {


  return (
    
    <div  className=' bg-[#000]  hide-scrollbar h-auto'>

          <>
            <div className="z-[100]">
              {children}

            </div>


            <header   className="w-full  bg-transparent fixed top-0 left-0 right-0 z-[120] transition-all " >
              <Header />
            </header> 

          

              {/* <Effect/> */}
              
              <footer style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)'}} className="w-full  h-[640px] relative bg-[#080808]">
                <div className="fixed flex  bottom-0 w-full h-[640px]">
                  <Footer />
                </div>
              </footer>
               {/* <Settings/> */}

              <div className="">
                <Bottom />
              </div>
          </>
    </div>
  )
}

export default Layout

