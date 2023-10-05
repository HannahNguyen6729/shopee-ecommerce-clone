import { Link } from 'react-router-dom';
import Popover from '../Popover/Popover';
import { useContext } from 'react';
import { AuthContext } from 'src/context/authContext';
import { http } from 'src/utils/http';
import { useMutation } from '@tanstack/react-query';

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { mutate: mutateUserLogout } = useMutation({
    mutationFn: async () => {
      await http.post('/logout');
    },
    onSuccess: () => {
      setIsAuthenticated(false);
    }
  });

  const handleLogout = () => {
    mutateUserLogout();
  };

  return (
    <div className='flex justify-end'>
      <Popover
        className='flex cursor-pointer items-center py-1 hover:text-white/70'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col py-2 pr-28 pl-3'>
              <button className='py-2 px-3 text-left hover:text-orange' onClick={() => {}}>
                Vietnamese
              </button>
              <button className='mt-2 py-2 px-3 text-left hover:text-orange' onClick={() => {}}>
                English
              </button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1 text-white'>Language</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-white/70'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to='/profile'
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                My account
              </Link>
              <Link to='/' className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'>
                My purchase
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Logout
              </button>
            </div>
          }
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            <img src='...' alt='avatar' className='h-full w-full rounded-full object-cover' />
          </div>
          <div>email ....</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to='/' className='mx-3 capitalize text-white hover:text-white/70'>
            Sign up
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40' />
          <Link to='/' className='mx-3 capitalize  text-white hover:text-white/70'>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
