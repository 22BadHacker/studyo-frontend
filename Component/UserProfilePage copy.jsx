'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'

export default async function UserProfilePage() {
  const { public_id } = useParams();

  let user = null;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/${public_id}`);
    user = res.data;
  } catch (err) {
    console.error(err);
    return <div>User not found</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">{user.username}</h1>
      <p className="text-white">ID: {user.public_id}</p>
      {user.profile_image && (
        <img
          src={user.profile_image}
          alt="Profile"
          className="w-32 h-32 rounded-full mt-4"
        />
      )}
      {user.bio && <p className="mt-4">{user.bio}</p>}
    </div>
  );
}
