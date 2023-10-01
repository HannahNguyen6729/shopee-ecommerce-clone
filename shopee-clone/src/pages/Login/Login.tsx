import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='bg-orange'>
      <title>Login | Shopee Clone</title>
      <meta name='description' content='Login to Shopee website' />

      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>Login </div>
              <input name='email' type='email' className='mt-8' placeholder='Email' />
              <input name='password' type='password' className='mt-2' placeholder='Password' autoComplete='on' />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                >
                  Login
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Register an account?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
