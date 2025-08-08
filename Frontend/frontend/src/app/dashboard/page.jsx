'use client';
import { useEffect, useState } from 'react';
import axios from '../lib/axiosInstance.js';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false)
  const router = useRouter();

  useEffect(() => {
    axios.get('/boards/get-boards')
      .then(res => setBoards(res.data.boards || res.data.board || []))
      .catch(() => router.push('/login'));
  }, []);

  const createBoard = async () => {
    try {
      const res = await axios.post('/boards/create-board', { title });
      setBoards(prev => [...prev, res.data.board]);
      setTitle('');
      console.log("Board created successfully");
    } catch (error) {
      console.error("Internal server error");
    }
  };

  const deleteBoard = async (id) =>{
    try {
      setLoadingDelete(true);
      await axios.delete(`/boards/delete/${id}`)
      .then(res => res.data.message)
      .catch(err => console.log("Error during fetching:", err))
      .finally(()=> {setLoadingDelete(false); setBoards(prev => prev.filter(board => board._id !== id))});
    } catch (error) {
      console.error("Internal server error");
    }
  }

  return (
    <div className="min-h-screen bg-black/20 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">📋 Your Boards</h2>

        <div className="flex gap-4 mb-6">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New board title" className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          <button onClick={createBoard} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold">+ Add Board</button>
        </div>

        <ul className="space-y-4">
          {boards.map(board => (
            <li key={board._id} onClick={() => router.push(`/dashboard/${board._id}`)} className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-4 rounded shadow transition-all flex justify-between items-center">
              <h3 className="text-lg font-medium">{board.title}</h3>
              <h3 className='bg-red-500 px-3 py-2 rounded cursor-pointer hover:bg-red-600' 
              onClick={(e)=> { e.stopPropagation(); deleteBoard(board._id) }}>Delete</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
