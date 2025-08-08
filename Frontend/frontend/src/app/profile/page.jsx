'use client';
import { useRouter } from 'next/navigation';
import axios from '../lib/axiosInstance';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Page() {
  const [user, setUser] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('/user/get-profile')
      .then((res) => setUser(res.data.newUser))
      .catch((err) => {
        console.error('Error loading profile:', err);
        router.push('/login');
      })
      .finally(() => setLoadingProfile(false));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-black/20 flex items-center justify-center text-white p-6">
      <div className="w-full max-w-md bg-gray-950 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-400">👤 Profile</h1>

        {loadingProfile ? (
          <p className="text-center animate-pulse text-gray-300">Loading...</p>
        ) : (
          <div className="space-y-4">
            <div className="text-lg">
              <p><span className="font-semibold text-gray-400">📧 Email:</span> {user.email}</p>
              <p><span className="font-semibold text-gray-400">👨 Username:</span> {user.username || 'N/A'}</p>
            </div>
            <div className='mt-4 flex justify-between'>
                <button onClick={logout} className="bg-red-600 hover:bg-red-700 transition-all text-white font-semibold py-2 px-4 rounded shadow-md cursor-pointer">Logout</button>
                <Link className='bg-blue-400 hover:bg-blue-500 rounded py-2 px-4 cursor-pointer' href='/dashboard'>Go Back</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
