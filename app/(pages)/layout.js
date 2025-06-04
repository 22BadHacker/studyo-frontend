import Footer from '@/Component/Footer'
import Header from '@/Component/Header'
import Bottom from '@/Component/Bottom';
import Image from 'next/image';
import logo from '@/public/Logo/Studyo_white.svg'



// export const metadata = {
//   title: "𝗦𝘁ü𝗱𝘆𝗼 — Your Music, Your Way.",

// };


const Layout = ({children}) => {


  return (
    
    <div  className='grid bg-[#000000]  hide-scrollbar h-auto overflow-y-scroll'>

          <>
            <header   className="w-full  bg-transparent fixed top-0 left-0 right-0 z-50  transition-all " >
              <Header />
            </header> 
          
              {children}
              <div className="container2 pb-4">
                <Image alt='Logo' className='w-full opacity-90' src={logo} width={140} height={140}/>
              </div>
              
              <footer style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)'}} className="w-full  h-[600px] relative bg-[#e82525]">
                <div className="fixed flex items-center  bottom-0 w-full h-[600px]">
                  <Footer />
                </div>
              </footer>


              <div className="w-full z-[30] fixed bottom-7 left-0 right-0 flex-center">
                <Bottom />
              </div>
          </>
    </div>
  )
}

export default Layout

