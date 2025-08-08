'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '../lib/axiosInstance.js';
import { useAuth } from '../context/authContext.js';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { email, password });
      localStorage.setItem('token', res.data.token);
      console.log("Login successful");  
      setIsAuthenticated(true);    
      router.replace('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg space-y-6 text-white">
        <h2 className="text-3xl font-bold text-center text-blue-400">Login</h2>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input  type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input  type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-2 rounded font-semibold text-white cursor-pointer">Login</button>
          <h1>Don't have an account? <span><Link href="/register" className='text-blue-400 underline'>Register</Link></span></h1>
      </form>
    </div>
  );
}

export default LoginPage;