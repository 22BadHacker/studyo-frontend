// 'use client'
import UserProfilePage from '@/Component/UserProfilePage'

// import { useParams } from 'next/navigation'
// import { useAppHook } from '@/context/AppProvider';

// export const metadata = {
//   title: "Profiles — 𝗦𝘁ü𝗱𝘆𝗼 ",  
// };



export async function generateMetadata({ params }) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/${params.public_id}`);
    const user = res.data;

    return {
      title: `${user.username}'s Profile | 𝗦𝘁ü𝗱𝘆𝗼`,
      description: `Discover ${user.username}'s music, bio, and profile on Ocean.`,
    };
  } catch (error) {
    return {
      title: 'User not found | 𝗦𝘁ü𝗱𝘆𝗼',
    };
  }
}

const page = () => {
    return (
    <div>
        <div className="container">
            <UserProfilePage/>
        </div>
    </div>
  )
}

export default page
