'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log("Token found in localStorage:", token);
      router.push(token ? '/dashboard' : '/login');
    }
  }, []);

  return null;
}
