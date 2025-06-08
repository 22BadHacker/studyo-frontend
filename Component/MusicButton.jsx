'use client';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react'; // Or use any icon lib
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { IoMusicalNoteSharp } from "react-icons/io5";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { PiMusicNotesPlusLight } from "react-icons/pi";
import { TfiControlPause } from "react-icons/tfi";


export default function MusicButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clicking, setClicking] = useState(false);
   const [volume, setVolume] = useState(0.5);

   const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed cursor-pointer top-7 right-9 z-50 flex items-center gap-2">
      <audio ref={audioRef} src="/music/nicee.mp3" loop />
      <button
        onClick={toggleMusic}
        className="bg-main2/50 cursor-pointer backdrop-blur-[5px] text-white p-3 rounded-full border-main2 border-[.5px] hover:scale-105 transition"
      >
        
        {/* <svg className='' width="35" height="35" viewBox="0 0 50 50"><circle cx="25" cy="25" r="8" fill="none" stroke="#00ce53" stroke-width="1" opacity="0"><animate attributeName="r" from="8" to="20" dur="2s" begin="0s" repeatCount="indefinite"></animate><animate attributeName="opacity" from="1" to="0" dur="2s" begin="0s" repeatCount="indefinite"></animate></circle><circle cx="25" cy="25" r="8" fill="none" stroke="#00ce53" stroke-width="1" opacity="0"><animate attributeName="r" from="8" to="20" dur="2s" begin="0.6s" repeatCount="indefinite"></animate><animate attributeName="opacity" from="1" to="0" dur="2s" begin="0.6s" repeatCount="indefinite"></animate></circle><circle cx="25" cy="25" r="8" fill="none" stroke="#00ce53" stroke-width="1" opacity="0"><animate attributeName="r" from="8" to="20" dur="2s" begin="1.2s" repeatCount="indefinite"></animate><animate attributeName="opacity" from="1" to="0" dur="2s" begin="1.2s" repeatCount="indefinite"></animate></circle><circle cx="25" cy="25" r="8" fill="#00ce53"><animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite"></animate></circle></svg> */}
        {isPlaying ? <TfiControlPause className='opacity-85 ' size={20} /> : <PiMusicNotesPlusLight className='animate-pulse ' size={20} />}
      </button>

      {
        isPlaying && (
            // {/* Volume Control */}
                  <div className="flex duration-200 ease-in-out items-center relative gap-2">
                    <button className='backdrop-blur-[5px] cursor-pointer  text-white p-[15px] rounded-full border-main2 border-[.5px] hover:scale-105 transition' onClick={() => setClicking(!clicking)}>
                        {volume === 0 ? <FaVolumeDown /> : <FaVolumeUp />}
                        {/* <FaVolumeUp  /> */}
                    </button>
                    {
                        clicking && (
                            <div className="fixed duration-200 ease-in-out right-3 top-[140px] rotate-90 w-24 h-2 bg-main/10 backdrop-blur-[4px]  overflow-hidden group">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolume}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div
                                className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${volume * 100}%` }}
                            ></div>
                            </div>
                        )
                    }
                    
                  </div>
        )
      }


    </div>
  );
}
