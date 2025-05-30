// 'use client'
import Header from "@/Component/Header";
import Player from "@/Component/Playerr";
import Hero from "@/Component/Preloader";
import Preloader from "@/Component/Preloader2";
import AudioPlayer from "@/Component/SimpleAudioPlayer";
import SimpleAudioPlayer from "@/Component/SimpleAudioPlayer";
// import Player from "@/Component/Player";
import Image from "next/image";
import Link from "next/link";
// import { useAppHook } from '@/context/AppProvider'
// import Hero from "@/Component/Preloader";
// import Hero from "@/Component/Hero";

export default function Home() {
  // const {user} = useAppHook();
  return (
    <div className="h-auto relative">
        <div className="container relative h-screen">
            {/* <Player /> */}
            {/* <Hero /> */}
            {/* <Preloader /> */}
        </div>
    </div>
  );
}

