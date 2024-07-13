'use client';

import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Initialize the Supabase client

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      // Redirect to dashboard or home page after successful login
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <h2 className='text-2xl mb-6 text-center font-bold'>Login</h2>
          {error && <p className='text-red-500 text-xs italic mb-4'>{error}</p>}
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='******************'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Sign In
            </button>
            <a
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
              href='/register'
            >
              Need an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
