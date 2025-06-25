'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppHook } from '@/context/AppProvider'
import { motion } from 'framer-motion'

const FollowButton = ({ artistId, artistProfileImg, artistName }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const { authToken } = useAppHook()

  useEffect(() => {
    if (!authToken) {
      setLoading(false)
      return
    }
    
    axios.get(`http://localhost:8000/api/is-following/${artistId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(res => {
      setIsFollowing(res.data.following)
      setLoading(false)
    })
    .catch(err => {
      console.error('Error checking follow status', err)
      setLoading(false)
    })
  }, [artistId, authToken])

  const handleFollowToggle = () => {
    if (!authToken) {
      setShowLoginPrompt(true)
      return
    }

    const endpoint = isFollowing ? 'unfollow' : 'follow'

    axios.post(`http://localhost:8000/api/${endpoint}/${artistId}`, {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(() => {
      setIsFollowing(prev => !prev)
    })
    .catch(err => {
      console.error('Follow/Unfollow failed', err)
    })
  }

  if (loading) return null

  return (
    <>
      <motion.button
        onClick={handleFollowToggle}
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


      {showLoginPrompt && (
        <div className="fixed -top-[200px] left-0 right-0  w-full z-[9999] h-full bg-black flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/10 rounded-lg p-6 max-w-sm w-full">
            <div className="flex flex-col items-center text-center">
              {artistProfileImg && (
                <img 
                  src={`http://localhost:8000/${artistProfileImg}`} 
                  alt={artistName}
                  className="size-[125px] rounded-full object-cover mb-4"
                />
              )}
              <h3 className="font-NeueMontreal font-semibold  text-[20px] text-white capitalize text-lg mb-2">Follow {artistName}</h3>
              <p className="text-[15px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75 mb-6">You need to be logged in to follow artists</p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowLoginPrompt(false)}
                  className="flex-1 px-4 py-2 border border-white/20 rounded-full hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Redirect to your login page
                    window.location.href = '/Auth/Login'
                  }}
                  className="flex-1 px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FollowButton