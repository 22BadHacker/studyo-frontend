'use client';
import { useState } from 'react';
import { BsCopy } from 'react-icons/bs';
import { IoMdShare } from "react-icons/io";
import { toast } from 'react-hot-toast';

export default function CopyLinkButton({ role, publicId }) {
  const [copied, setCopied] = useState(false);

  const profileUrl = `${window.location.origin}/${role}/${publicId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast.success('Link Copied!')
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <button onClick={handleCopy} className='relative group flex-center hover:text-white duration-200 ease-in-out  rounded-full text-white/80 cursor-pointer text-[19px]'><IoMdShare/> <span className='text-[12px] group-hover:opacity-100 opacity-0 rounded absolute top-[40px] font-semibold w-[120px] duration-200 ease-in-out  text-white/80 bg-main2 px-[9px] py-[4px]'>Copy Profile Link</span></button>
      {/* {copied && ( toast.success('Link Copied!'))} */}
    </>



    // <button
    //   onClick={handleCopy}
    //   className="flex items-center gap-2 transition"
    // >
    //   <IoMdShare  />
    //   {copied ? 'Link Copied!' : 'Copy Profile Link'}
    // </button>
  );
}
