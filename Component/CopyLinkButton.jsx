'use client';
import { useState } from 'react';
import { BsCopy } from 'react-icons/bs';
import { IoMdShare } from "react-icons/io";
import { toast } from 'react-hot-toast';
import { PiCopySimpleThin } from 'react-icons/pi';

export default function CopyLinkButton({ role, publicId }) {
  const [copied, setCopied] = useState(false);

  const profileUrl = `${window.location.origin}/${role}/${publicId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast.success('Link Copied!', {
        className: 'font-NeueMontreal bg-black/50   w-fit h-fit px-6 py-1 text-[14px] font-medium',
      })
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>

      <div onClick={handleCopy}  className="cursor-pointer relative bg-main/15 text-[18px]  text-white/80 hover:text-white size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out  "><PiCopySimpleThin /> <span className="absolute group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[95px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/2 -translate-x-1/2">{copied ? 'Link Copied!' : 'Copy Profile Link'}</span></div>

    </>



  );
}
