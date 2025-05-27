import axios from 'axios';

export async function getUserByPublicId(public_id) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/${public_id}`);
  return res.data;
}
