// lib/api.js
export async function getUserByPublicId(public_id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${public_id}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}