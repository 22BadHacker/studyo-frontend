'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function ResolveProfile() {
  const { public_id } = useParams();
  const router = useRouter();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/resolve-profile/${public_id}`)
      .then(res => router.push(res.data.redirect_to))
      .catch(err => console.error(err));
  }, [public_id, router]);

  return <p>Redirecting...</p>;
}
