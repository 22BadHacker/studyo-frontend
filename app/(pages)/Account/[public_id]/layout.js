import React from 'react'

export async function metadata({ params }) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${public_id}`);
    const user = res.data;

    return {
      title: `${user.username}'s Profile | 𝗦𝘁ü𝗱𝘆𝗼`,
      // description: `Discover ${user.username}'s music, bio, and profile on Ocean.`,
    };
  } catch (error) {
    return {
      title: 'User not found | 𝗦𝘁ü𝗱𝘆𝗼',
    };
  }
}

const layout = ({children}) => {
  return (
    <div className='relative'>
        {children}
    </div>
  )
}

export default layout
