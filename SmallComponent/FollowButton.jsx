'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppHook } from '@/context/AppProvider'
import {motion} from 'framer-motion'

const FollowButton = ({ artistId }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)
  const {authToken} = useAppHook()

  useEffect(() => {
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
  }, [artistId])

  const handleFollowToggle = () => {
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
  )
}

export default FollowButton
