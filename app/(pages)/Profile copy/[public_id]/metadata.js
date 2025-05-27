import { getUserByPublicId } from '@/lib/user';

export async function generateMetadata({ params }) {
  try {
    const user = await getUserByPublicId(params.public_id);
    return {
      title: `${user.username}'s Profile | Ocean`,
    };
  } catch (error) {
    return {
      title: 'User Not Found | Ocean',
    };
  }
}
