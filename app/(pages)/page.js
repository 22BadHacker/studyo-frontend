'use client'
import Header from "@/Component/Header";
import Player from "@/Component/Player";
import Image from "next/image";
import Link from "next/link";
import { useAppHook } from '@/context/AppProvider'

export default function Home() {
  const {user} = useAppHook();
  return (
    <div className="h-screen relative">
        <div className="container">

            {/* <Link href={`/Profile/${user.public_id}`}>Mounir Lagzouli</Link> */}
        </div>
    </div>
  );
}
