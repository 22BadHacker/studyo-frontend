'use client';
import Image from 'next/image';
import logo from '@/public/Logo/Studyo_white.svg';

const images = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
];

const Hero = () => {
  return (
    <div className="h-svh z-[9999]  flex items-center justify-center  w-full overflow-hidden">
      {/* Background Slideshow with CSS */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i}`}
            className={`absolute inset-0 w-full h-full object-cover animate-fade-slide delay-${i * 500}`}
            style={{ animationDelay: `${i * 3}s` }}
          />
        ))}
      </div>

      {/* Logo on top */}
      <Image
        alt="Logo"
        className="w-[50%] mix-blend-difference   z-10"
        src={logo}
        width={140}
        height={140}
      />
    </div>
  );
};

export default Hero;
