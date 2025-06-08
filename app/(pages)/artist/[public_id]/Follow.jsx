'use client'
import React, { useState } from 'react'
import {motion} from 'framer-motion'

const Follow = () => {
    const [isFollowing, setIsFollowing] = useState(false);
  return (
    <>
      <motion.button
            onClick={() => setIsFollowing(prev => !prev)}
            className="relative cursor-pointer px-5 py-[10px] rounded-full border border-white/20 overflow-hidden text-white text-sm font-medium"
            initial={false}
            animate={{ backgroundColor: isFollowing ? '#ffffff' : 'transparent', color: isFollowing ? '#000' : '#fff' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
            <motion.span
                key={isFollowing ? 'unfollow' : 'follow'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </motion.span>
        </motion.button>
    </>
  )
}

export default Follow
