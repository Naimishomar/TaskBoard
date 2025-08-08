'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '../../lib/axiosInstance.js';
import Link from 'next/link';

export default function BoardDetail() {
  const params = useParams();
  const boardId = params?.id;
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loadingTask, setLoadingTask] = useState(true);

  useEffect(() => {
    if (!boardId) return;
    axios.get(`/tasks/${boardId}`)
      .then(res => setTasks(res.data.tasks))
      .catch(err => console.error("Error loading tasks", err))
      .finally(() => setLoadingTask(false));
  }, [boardId]);

  const addTask = async () => {
    try {
      const response = await axios.post(`/tasks/${boardId}`, {
        title,
        description,
        status: "Pending",
        dueDate: new Date().toISOString(),
        boardId,
      });
      setTasks(prev => [...prev, response.data.task]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error("Internal server error", error);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const updated = await axios.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status === 'Pending' ? 'Completed' : 'Pending',
      });
      setTasks(prev => prev.map(t => t._id === task._id ? updated.data.task : t));
    } catch (error) {
      console.error("Internal server error", error);
    }
  };

  return (
    <div className="min-h-screen bg-black/20 text-white px-4 py-6">
      <Link className='bg-red-900 py-3 px-4 cursor-pointer rounded-md hover:bg-red-800' href="/dashboard">Go back</Link>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">📝 Your Tasks</h2>

        <div className="mb-6 space-y-3">
          <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500" value={title} onChange={e => setTitle(e.target.value)} placeholder="Task Title"/>
          <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500" value={description} onChange={e => setDescription(e.target.value)} placeholder="Task Description"/>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition" onClick={addTask}>➕ Add Task</button>
        </div>

        {loadingTask ? (
          <p className="text-center text-gray-400">Loading Tasks...</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map(task => (
              <li key={task._id} className={`p-4 rounded-md cursor-pointer transition border ${task.status === 'Completed' ? 'bg-green-800 border-green-600' : 'bg-red-800 border-red-600'}`} onClick={() => toggleStatus(task)}>
                <div className='flex justify-between items-center'>
                  <p className="font-semibold text-lg">{task.title}</p>
                  <p>{task.status}</p>
                </div>
                <p className="text-sm text-white">{task.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
