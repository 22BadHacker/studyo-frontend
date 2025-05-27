'use client'
import Header from "@/Component/Header";
import Player from "@/Component/Player";
import Image from "next/image";
import Link from "next/link";
import { useAppHook } from '@/context/AppProvider'
import Hero from "@/Component/Hero";

export default function Home() {
  const {user} = useAppHook();
  return (
    <div className="h-auto relative">
        <div className="container">
            <Hero />
        </div>
    </div>
  );
}

// {/* <Link href={`/Profile/${user.public_id}`}>Mounir Lagzouli</Link> */}