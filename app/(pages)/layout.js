import Footer from '@/Component/Footer'
import Header from '@/Component/Header'
import Bottom from '@/Component/Bottom';



// export const metadata = {
//   title: "𝗦𝘁ü𝗱𝘆𝗼 — Your Music, Your Way.",

// };


const Layout = ({children}) => {


  return (
    
    <div id="scroll-container" className='grid bg-[#000000]  hide-scrollbar  h-screen overflow-y-scroll'>

          <>
            <header   className="w-full  bg-transparent fixed top-0 left-0 right-0 z-50  transition-all " >
              <Header />
            </header> 
          
              {children}

              <footer className="w-full  h-auto bg-[#000000]">
                  <Footer />
              </footer>

              <div className="w-full z-[30] fixed bottom-7 left-0 right-0 flex-center">
                <Bottom />
              </div>
          </>
    </div>
  )
}

export default Layout

