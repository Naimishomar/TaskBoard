'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../lib/axiosInstance.js';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/register', { email, password, username });
      router.push('/login');
      console.log("Registered successfully");
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg space-y-6 text-white">
        <h2 className="text-3xl font-bold text-center text-green-400">Register</h2>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500" required/>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500" required/>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500" required/>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 transition-all py-2 rounded font-semibold text-white cursor-pointer">Register</button>

          <p className="text-center text-sm text-gray-400">Already have an account? <Link href="/login" className="text-green-400 underline">Login</Link></p>
      </form>
    </div>
  );
}
