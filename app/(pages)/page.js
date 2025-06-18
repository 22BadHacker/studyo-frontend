
import Settings from "@/Component/Settings";
import Image from "next/image";
import Link from "next/link";
import Songs from "./Songs";
import Hits from "./Hits";

export default function Home() {
  // const {user} = useAppHook();
  return (
    <div className="min-h-screen pt-[160px] pb-[180px] ">
        <div className="container relative flex flex-col gap-[30px] relative h-auto">
           {/* <h1 className="text-[10.30vw] relative text-shadow-2xs text-shadow-[#d8262c] pt-5 text-[#d8262c] font-NeueMontreal font-bold uppercase leading-[.46] text-end">Trending Tracks <span className=" tracking-tight text-[5.78vw] font-[800]  text-[#d7d7d7]/90 text-shadow-2xs text-shadow-transparent  "> You’ll Love</span></h1> */}
           <h1 className="text-[10.26vw] pt-5 text-[#d8262c] text-shadow-2xs text-shadow-[#d8262c] font-NeueMontreal font-bold uppercase leading-[.35] text-end">Trending Tracks <br /><span className="text-[2.54vw] lowercase relative -top-6   tracking-tight font-[800] text-[#d7d7d7]/90 text-shadow-2xs text-shadow-transparent "> You will Love</span></h1>
           <img src="/xx.svg" alt="xx" className="absolute scale-95  -top-5 left-0  object-cover" />
           <div className="flex z-[10] flex-col gap-20">
            <Songs />
            <Hits/>

           </div>
        </div>
    </div>
  );
}


           {/* <h1 className="text-[10.26vw] pt-5 text-[#d7d7d7]/90 text-shadow-2xs text-shadow-[#d7d7d7]/90 font-NeueMontreal font-bold uppercase leading-[.35] text-end">Trending Tracks <br /><span className="text-[4vw] relative -top-10  tracking-tight font-[800] text-shadow-2xs text-shadow-red-500 text-red-500 "> You’ll Love</span></h1> */}
           {/* <h1 className="text-[8.25vw]  font-NeueMontreal font-bold uppercase leading-[.85] text-center">discover your music!</h1> */}
           {/* <h1 className="text-[11.2vw]  font-NeueMontreal font-bold uppercase leading-[.85] text-center">Trending <span className=" text-green-500">music</span> <br /> this Week!</h1> */}