import ClientLayout from "@/Components/ClientLayout";


export const metadata = {
  title: "𝗦𝘁ü𝗱𝘆𝗼 — Your Music, Your Way.",

};


const Layout = ({children}) => {


  return (
    
    <div  className=' bg-[#000]  hide-scrollbar h-auto'>

          <>
            <ClientLayout>
              {children}
            </ClientLayout>
          </>
    </div>
  )
}

export default Layout

