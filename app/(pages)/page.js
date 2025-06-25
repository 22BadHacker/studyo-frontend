
import Settings from "@/Component/Settings";
import Image from "next/image";
import Link from "next/link";
import Songs from "./Songs";
import Hits from "./Hits";
import Artists from "./Artists";
import Studyo from "./Studyo";

export default function Home() {
  // const {user} = useAppHook();
  return (
    <div className="min-h-screen pt-[190px] pb-[180px] ">
        <div className="container  flex flex-col gap-[30px] relative h-auto">
           {/* <h1 className="text-[10.30vw] relative text-shadow-2xs text-shadow-[#d8262c] pt-5 text-[#d8262c] font-NeueMontreal font-bold uppercase leading-[.46] text-end">Trending Tracks <span className=" tracking-tight text-[5.78vw] font-[800]  text-[#d7d7d7]/90 text-shadow-2xs text-shadow-transparent  "> You’ll Love</span></h1> */}
           {/* <h1 className="text-[10.3vw] z-10 pb-[55px]  relative pt-5 text-[#d8262c] text-shadow-2xs text-shadow-[#d8262c] font-NeueMontreal font-bold uppercase leading-[.35] text-end">Trending Tracks <br />
              <div className="absolute w-fit px-7 text-[18px] text-white flex-center text-shadow-2xs text-shadow-transparent rounded-full h-12 bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-sm  top-5  -rotate-10 lowercase font-semibold right-12">You will Love</div>
              <div className="absolute z-[10] w-fit px-4 text-[18px] text-white flex-center text-shadow-2xs text-shadow-transparent rounded-full h-12 bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-sm  top-2 -rotate-12 lowercase font-semibold left-10">rising from the underground</div>
              <div className="absolute z-[10] w-fit text-[18px] text-white flex-center text-shadow-2xs text-shadow-transparent rounded-full h-12 bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-sm  bottom-0 px-4 py-1 -rotate-5 lowercase font-semibold left-[50%] -translate-x-1/2 ">you can’t stop playing.</div>
           </h1> */}

           <h1 className="text-[9.4vw]  w-fit z-10 pb-[55px]  relative pt-5  font-Oswald font-bold uppercase leading-[.35] text-start"> <span className="textx">Your Vibe, Your Stage.</span><br />
              <div className="absolute z-[10] w-fit px-5 text-[12px]  tracking-wider text-white flex-center  rounded-full py-4.5 bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-[6px]   top-0 -rotate-8 font-medium capitalize left-1/2 -translate-x-1/2">We take music production seriously.</div>
              <div className="absolute z-[10] w-fit px-4 text-[12px] tracking-wider text-white flex-center text-shadow-2xs text-shadow-transparent rounded-full py-4.5 bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-[6px]   bottom-6 -rotate-8 font-medium capitalize left-10">Unleash your inner musician.</div>
              <div className="absolute z-[10] w-fit px-4 text-[12px] tracking-wider text-white flex-center text-shadow-2xs text-shadow-transparent rounded-full py-4.5 bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-[6px]   bottom-6 -rotate-8 font-medium capitalize right-10">Silly Songs, Serious Fun!</div>
              {/* <div className="absolute z-[10] w-fit px-5 text-[12px] tracking-wide text-white flex-center text-shadow-2xs text-shadow-transparent rounded-full py-4.5 bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-[6px]   top-0 -rotate-8 font-medium capitalize left-1/2 -translate-x-1/2">to turn up the volume on.</div>
              <div className="absolute z-[10] w-fit px-4 text-[12px] tracking-wide text-white flex-center text-shadow-2xs text-shadow-transparent rounded-full py-4.5 bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-[6px]   bottom-6 -rotate-8 font-medium capitalize left-10">rising from the underground</div>
              <div className="absolute z-[10] w-fit px-4 text-[12px] tracking-wide text-white flex-center text-shadow-2xs text-shadow-transparent rounded-full py-4.5 bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-[6px]   bottom-6 -rotate-8 font-medium capitalize right-10">you can’t stop playing.</div> */}
           </h1>
           <img src="/xx.svg" alt="xx" className="absolute scale-95 mix-blend-screen saturate-150 -top-20 blur-2xl -right-1 rotate-6  object-cover" />
           <div className="flex z-[10] flex-col gap-[75px]">
            <Songs />
            <Artists/>
            <Hits/>
            <Studyo/>

           </div>
        </div>
    </div>
  );
}


           {/* <h1 className="text-[10.26vw] pt-5 text-[#d7d7d7]/90 text-shadow-2xs text-shadow-[#d7d7d7]/90 font-NeueMontreal font-bold uppercase leading-[.35] text-end">Trending Tracks <br /><span className="text-[4vw] relative -top-10  tracking-tight font-[800] text-shadow-2xs text-shadow-red-500 text-red-500 "> You’ll Love</span></h1> */}
           {/* <h1 className="text-[8.25vw]  font-NeueMontreal font-bold uppercase leading-[.85] text-center">discover your music!</h1> */}
           {/* <h1 className="text-[11.2vw]  font-NeueMontreal font-bold uppercase leading-[.85] text-center">Trending <span className=" text-green-500">music</span> <br /> this Week!</h1> */}