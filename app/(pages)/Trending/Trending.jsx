'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Trending = () => {
    const [allUsers, setAllUsers] = useState([])
    const [featuredUsers, setFeaturedUsers] = useState([]);
    const { public_id } = useParams();


    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${public_id}`, {
            });
            setAllUsers(res.data);
            const targetIds = [100, 50, 90, 12, 45, 40] 
            const filtered = res.data.filter(user => targetIds.includes(user.id))
            setAllUsers(res.data);
          } catch (err) {
            console.error('❌ Failed to fetch User', err);
          }
        };
    
        fetchUser();
      }, [public_id]);
  return (
    <div className='w-full pt-20 h-auto flex flex-col gap-10'>
        <div className="w-full flex items-center justify center">
            {featuredUsers.map(user => (
                <div key={user.id} className="bg-white shadow rounded p-4 text-center">
                <img
                    src={user.profile_image_url || '/default-avatar.png'}
                    className="w-16 h-16 mx-auto rounded-full mb-2"
                    alt={user.name}
                />
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.role}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Trending
