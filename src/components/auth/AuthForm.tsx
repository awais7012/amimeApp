import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { login, register } from '../../services/api';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await (isLogin ? login(email, password) : register(email, password));
      localStorage.setItem('token', response.data.token);
      navigate('/browse');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="bg-black/80 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-4 rounded font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="text-zinc-400 mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}