import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';

import { useSelector } from 'react-redux';

const Header = () => {
    const { currentUser } = useSelector(store => store.user);
    console.log(currentUser)
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl m-auto p-3'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Shahad</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>

                <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type="text" placeholder='Search...' className='bg-transparent outline-none w-30 sm:w-64' />
                    <FaSearch className='bg-transparent' />
                </form>


                <ul className='flex gap-4 text-slate-500 text-md'>
                    <Link to="/"><li className='hidden sm:inline hover:underline cursor-pointer'>Home</li></Link>
                    <Link to="/about"><li className='hidden sm:inline hover:underline cursor-pointer'>About</li></Link>

                    <Link to="/profile">
                        {currentUser ? <img className='rounded-full w-7 h-7 object-cover' src={currentUser.avatar} alt="user-png" />
                            : <li className='hover:underline cursor-pointer'>Sing In</li>
                        }
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header