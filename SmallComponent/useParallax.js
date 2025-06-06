// components/hooks/useParallaxEffect.js
'use client';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef } from 'react';

export const useParallaxEffect = (speed = 1) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  // const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']); // percentage-based movement
  return { ref, y };
};
