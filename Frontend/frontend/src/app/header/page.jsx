'use client';
import Link from 'next/link';
import { useAuth } from '../context/authContext.js';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link href="/">TaskBoard</Link>
      </h1>
      <nav>
        {isAuthenticated ? (
          <Link href="/profile" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Profile</Link>
        ) : (
          <Link href="/login" className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded">Login</Link>
        )}
      </nav>
    </header>
  );
}
