'use client'

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useParams } from 'next/navigation';

export default function Follows() {
  const { public_id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Fetch artist data + check if current user follows them
    api.get(`/users/${public_id}`).then(res => setUser(res.data));
    api.get(`/follow-status/${public_id}`).then(res => {
      setIsFollowing(res.data.isFollowing);
    });
  }, [public_id]);

  const toggleFollow = async () => {
    if (isFollowing) {
      await api.get('/sanctum/csrf-cookie');
      await api.post(`/unfollow/${public_id}`);
    } else {
      await api.post(`/follow/${public_id}`);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div>
      {/* other layout parts */}
      <button
        onClick={toggleFollow}
        className={`px-6 py-2 rounded-full transition-all duration-300 ${
          isFollowing
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-green-500 text-black hover:bg-green-600'
        }`}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}
